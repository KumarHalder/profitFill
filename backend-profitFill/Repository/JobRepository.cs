using backend_profitFill.DTO;
using backend_profitFill.Exceptions;
using backend_profitFill.Model;
using Microsoft.EntityFrameworkCore;

namespace backend_profitFill.Repository;

public interface IJobRepository
{
    Task<Job?> GetJobById(int id);
    List<Job> GetJobs();
    Task<Job> CreateJob(Job job);
    Task<Job> UpdateJob(int id, Job job);
    Task DeleteJob(int id);
}
public class JobRepository(AppDbContext dbContext, ILogger<JobRepository> logger) : IJobRepository
{
    public async Task<Job?> GetJobById(int id)
    {
        return await dbContext.job.FindAsync(id);
    }

    public List<Job> GetJobs()
    {
        return  dbContext.job.ToList();
    }

    public async Task<Job> CreateJob(Job job)
    {
        dbContext.job.Add(job);
        await dbContext.SaveChangesAsync();
        return job;
    }

    public async Task<Job> UpdateJob(int id, Job job)
    {
        var jobModel = await GetJobById(id);
        if (jobModel == null) throw new IdNotFoundException(job.Id);
        
        jobModel.UpdateInstance(job);
        await dbContext.SaveChangesAsync();
        
        return jobModel;
    }

    public async Task DeleteJob(int id)
    {
        var job = await dbContext.job.FindAsync(id);
        if (job == null) throw new IdNotFoundException(id);
            
         dbContext.job.Remove(job);
         await dbContext.SaveChangesAsync();
    }
}