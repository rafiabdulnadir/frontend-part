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
