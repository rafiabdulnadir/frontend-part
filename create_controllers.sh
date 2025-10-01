#!/bin/bash

# Create Controllers
cat > SkillNet.Api/Controllers/AuthController.cs << 'INNER_EOF'
using Microsoft.AspNetCore.Mvc;
using SkillNet.Api.DTOs.Auth;
using SkillNet.Api.Services;

namespace SkillNet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    /// <summary>
    /// Register a new user
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            var response = await _authService.RegisterAsync(registerDto);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    /// <summary>
    /// Login user
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
    {
        try
        {
            var response = await _authService.LoginAsync(loginDto);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
    
    /// <summary>
    /// Refresh JWT token
    /// </summary>
    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponseDto>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
    {
        try
        {
            var response = await _authService.RefreshTokenAsync(refreshTokenDto.RefreshToken);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (NotImplementedException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    /// <summary>
    /// Revoke refresh token
    /// </summary>
    [HttpPost("revoke")]
    public async Task<ActionResult> RevokeToken([FromBody] RefreshTokenDto refreshTokenDto)
    {
        await _authService.RevokeTokenAsync(refreshTokenDto.RefreshToken);
        return Ok(new { message = "Token revoked successfully" });
    }
}
INNER_EOF

cat > SkillNet.Api/Controllers/UsersController.cs << 'INNER_EOF'
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillNet.Api.DTOs.User;
using SkillNet.Api.Services;
using System.Security.Claims;

namespace SkillNet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    /// <summary>
    /// Get current user's profile
    /// </summary>
    [HttpGet("profile")]
    public async Task<ActionResult<UserProfileDto>> GetProfile()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        var profile = await _userService.GetUserProfileAsync(userId);
        if (profile == null)
        {
            return NotFound();
        }
        
        return Ok(profile);
    }
    
    /// <summary>
    /// Get user profile by ID
    /// </summary>
    [HttpGet("{userId}")]
    [AllowAnonymous]
    public async Task<ActionResult<UserProfileDto>> GetUserProfile(string userId)
    {
        var profile = await _userService.GetUserProfileAsync(userId);
        if (profile == null)
        {
            return NotFound();
        }
        
        // Record profile view
        var viewerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
        
        await _userService.RecordProfileViewAsync(userId, viewerId, ipAddress, userAgent);
        
        return Ok(profile);
    }
    
    /// <summary>
    /// Update current user's profile
    /// </summary>
    [HttpPut("profile")]
    public async Task<ActionResult<UserProfileDto>> UpdateProfile([FromBody] UpdateUserProfileDto updateDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        try
        {
            var updatedProfile = await _userService.UpdateUserProfileAsync(userId, updateDto);
            return Ok(updatedProfile);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    /// <summary>
    /// Search users by name, email, or skills
    /// </summary>
    [HttpGet("search")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<UserDto>>> SearchUsers([FromQuery] string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return BadRequest(new { message = "Search term is required" });
        }
        
        var users = await _userService.SearchUsersAsync(searchTerm);
        return Ok(users);
    }
    
    /// <summary>
    /// Get users by skill
    /// </summary>
    [HttpGet("by-skill/{skillName}")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersBySkill(string skillName)
    {
        var users = await _userService.GetUsersBySkillAsync(skillName);
        return Ok(users);
    }
    
    /// <summary>
    /// Add skill to current user
    /// </summary>
    [HttpPost("skills")]
    public async Task<ActionResult> AddSkill([FromBody] AddUserSkillDto skillDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        await _userService.AddUserSkillAsync(userId, skillDto.SkillName, skillDto.ProficiencyLevel);
        return Ok(new { message = "Skill added successfully" });
    }
    
    /// <summary>
    /// Remove skill from current user
    /// </summary>
    [HttpDelete("skills/{skillName}")]
    public async Task<ActionResult> RemoveSkill(string skillName)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
        {
            return Unauthorized();
        }
        
        await _userService.RemoveUserSkillAsync(userId, skillName);
        return Ok(new { message = "Skill removed successfully" });
    }
}
INNER_EOF

cat > SkillNet.Api/Controllers/ProjectsController.cs << 'INNER_EOF'
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
INNER_EOF

cat > SkillNet.Api/Controllers/FeedbackController.cs << 'INNER_EOF'
using Microsoft.AspNetCore.Mvc;
using SkillNet.Api.DTOs.Feedback;
using SkillNet.Api.Models;
using SkillNet.Api.Repositories;

namespace SkillNet.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeedbackController : ControllerBase
{
    private readonly IGenericRepository<Feedback> _feedbackRepository;
    
    public FeedbackController(IGenericRepository<Feedback> feedbackRepository)
    {
        _feedbackRepository = feedbackRepository;
    }
    
    /// <summary>
    /// Submit feedback
    /// </summary>
    [HttpPost]
    public async Task<ActionResult> SubmitFeedback([FromBody] CreateFeedbackDto feedbackDto)
    {
        var feedback = new Feedback
        {
            Name = feedbackDto.Name,
            Email = feedbackDto.Email,
            Phone = feedbackDto.Phone,
            Company = feedbackDto.Company,
            Role = feedbackDto.Role,
            Github = feedbackDto.Github,
            Subject = feedbackDto.Subject,
            Urgency = feedbackDto.Urgency,
            FeedbackType = feedbackDto.FeedbackType,
            Message = feedbackDto.Message,
            CreatedAt = DateTime.UtcNow
        };
        
        await _feedbackRepository.AddAsync(feedback);
        
        return Ok(new { message = "Feedback submitted successfully" });
    }
}
INNER_EOF

echo "Controller files created successfully!"
