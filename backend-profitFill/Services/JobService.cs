using backend_profitFill.DTO;
using backend_profitFill.Model;
using backend_profitFill.Repository;

namespace backend_profitFill.Services;
public interface IJobService
{
    Task<JobDTO?> GetJobById(int id);
    List<JobDTO> GetJobs();
    Task<JobDTO> CreateJob(JobDTO job);
    Task<JobDTO> UpdateJob(int id, JobDTO job);
    Task DeleteJob(int id);
}
public class JobService(IJobRepository jobRepository) : IJobService
{
    public async Task<JobDTO> GetJobById(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Job ID must be a positive integer.", nameof(id));

        var job = await jobRepository.GetJobById(id);
        if (job == null)
            throw  new Exception(message: $"Job with {id} does not exist");
        
        return JobDTO.CreateInstance(job);
    }

    public List<JobDTO> GetJobs()
    {
        var jobs =  jobRepository.GetJobs().OrderBy(job => job.Id).ToList();
        return jobs.ConvertAll(JobDTO.CreateInstance);
    }

    public async Task<JobDTO> CreateJob(JobDTO jobDto)
    {
        ValidateJobDto(jobDto);
        
        var jobModel = await jobRepository.CreateJob(Job.CreateInstance(jobDto));
        return JobDTO.CreateInstance(jobModel);
    }

    public async Task<JobDTO> UpdateJob(int id, JobDTO jobDto)
    { 
        ValidateJobDto(jobDto);
        
       var jobModel = await jobRepository.UpdateJob(id, Job.CreateInstance(jobDto));
       return JobDTO.CreateInstance(jobModel);
    }

    public async Task DeleteJob(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Job ID must be a positive integer.", nameof(id));

        await jobRepository.DeleteJob(id);
    }
    
    private static void ValidateJobDto(JobDTO jobDto)
    {
        if (jobDto == null)
            throw new ArgumentNullException(nameof(jobDto), "JobDTO cannot be null.");
        if (string.IsNullOrWhiteSpace(jobDto.CustomerName))
            throw new ArgumentException("customer name cannot be empty.", nameof(jobDto.CustomerName));
        if (string.IsNullOrWhiteSpace(jobDto.JobType))
            throw new ArgumentException("Job Type cannot be empty.", nameof(jobDto.JobType));
        if (string.IsNullOrWhiteSpace(jobDto.Status))
            throw new ArgumentException("Job Status cannot be empty.", nameof(jobDto.Status));
        if (string.IsNullOrWhiteSpace(jobDto.AppointmentDate))
            throw new ArgumentException("Job Appointment cannot be empty.", nameof(jobDto.AppointmentDate));
        if (string.IsNullOrWhiteSpace(jobDto.Technician))
            throw new ArgumentException("Job Technician cannot be empty.", nameof(jobDto.Technician));

    }
}