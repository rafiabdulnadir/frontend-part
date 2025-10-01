using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillNet.Api.DTOs.Project;
using SkillNet.Api.Services;
using System.Security.Claims;

namespace SkillNet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;
    
    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }
    
    /// <summary>
    /// Get all projects with optional filtering
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects(
        [FromQuery] string? searchTerm = null,
        [FromQuery] List<string>? categories = null,
        [FromQuery] List<string>? technologies = null,
        [FromQuery] List<string>? domains = null,
        [FromQuery] int skip = 0,
        [FromQuery] int take = 20)
    {
        var filter = new ProjectFilterDto
        {
            SearchTerm = searchTerm,
            Categories = categories,
            Technologies = technologies,
            Domains = domains,
            Skip = skip,
            Take = take
        };
        
        var projects = await _projectService.GetFilteredProjectsAsync(filter);
        return Ok(projects);
    }
    
    /// <summary>
    /// Get project by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetProject(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null)
        {
            return NotFound();
        }
        
        return Ok(project);
    }
    
    /// <summary>
    /// Get projects by user ID
    /// </summary>
    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsByUser(string userId)
    {
        var projects = await _projectService.GetProjectsByUserAsync(userId);
        return Ok(projects);
    }
    
    /// <summary>
    /// Get current user's projects
    /// </summary>
    [HttpGet("my-projects")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetMyProjects()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        var projects = await _projectService.GetProjectsByUserAsync(userId);
        return Ok(projects);
    }
    
    /// <summary>
    /// Search projects
    /// </summary>
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> SearchProjects([FromQuery] string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return BadRequest(new { message = "Search term is required" });
        }
        
        var projects = await _projectService.SearchProjectsAsync(searchTerm);
        return Ok(projects);
    }
    
    /// <summary>
    /// Create new project
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] CreateProjectDto createDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        var project = await _projectService.CreateProjectAsync(userId, createDto);
        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
    }
    
    /// <summary>
    /// Update project
    /// </summary>
    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ProjectDto>> UpdateProject(int id, [FromBody] UpdateProjectDto updateDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        try
        {
            var project = await _projectService.UpdateProjectAsync(id, userId, updateDto);
            return Ok(project);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }
    
    /// <summary>
    /// Delete project
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteProject(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        try
        {
            await _projectService.DeleteProjectAsync(id, userId);
            return Ok(new { message = "Project deleted successfully" });
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
    }
}
