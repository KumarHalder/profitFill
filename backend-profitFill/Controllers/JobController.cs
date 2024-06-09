using backend_profitFill.DTO;
using backend_profitFill.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_profitFill.Controllers;

[ApiController]
[Route("api/[controller]")]

public class JobsController(IJobService jobService, ILogger<JobsController> logger) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<JobDTO>> GetJobs()
    {
        var jobs = jobService.GetJobs();
        return Ok(jobs);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<JobDTO>> GetJobById(int id)
    {
        try
        {
            var job = await jobService.GetJobById(id);
            if (job == null) return NotFound();
            return Ok(job);
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "xxAn unexpected error occurred while processing your request.");

        }

    }

    [HttpPost]
    public async Task<ActionResult<JobDTO>> CreateJob([FromBody] JobDTO job)
    {
        try
        {
            var createdjob = await jobService.CreateJob(job);
            return Ok(createdjob);
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred while processing your request.");

        }

    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<JobDTO>> UpdateJob(int id, [FromBody] JobDTO updatedJob)
    {
        try
        {
            var job = await jobService.UpdateJob(id, updatedJob);
            return Ok(job);
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred while processing your request.");

        }

    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        try
        {
            await jobService.DeleteJob(id);
            return NoContent();
        }
        catch (Exception e)
        {
            logger.LogError(e.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred while processing your request.");

        }

    }
}
