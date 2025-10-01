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
