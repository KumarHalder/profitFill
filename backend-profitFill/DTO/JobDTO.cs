using backend_profitFill.Model;

namespace backend_profitFill.DTO;

public class JobDTO
{
    public static JobDTO CreateInstance(Job jobModel)
    {
        return new JobDTO
        {
            Id =  jobModel.Id,
            JobType = jobModel.JobType,
            CustomerName = jobModel.CustomerName,
            Status = jobModel.Status,
            AppointmentDate =  jobModel.AppointmentDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
            Technician = jobModel.Technician
        };
    }

    public int Id { get; set; }
    public string CustomerName { get; set; }
    public string JobType { get; set; }
    public string Status { get; set; }
    public string AppointmentDate { get; set; }
    public string Technician { get; set; }
}