using System.Globalization;
using backend_profitFill.DTO;

namespace backend_profitFill.Model;

public class Job
{
 
 public static Job CreateInstance(JobDTO jobDto)
 {
  return new Job
  {
   Id = jobDto.Id,
   JobType = jobDto.JobType,
   CustomerName = jobDto.CustomerName,
   Status =  jobDto.Status,
   AppointmentDate = DateTime.ParseExact(jobDto.AppointmentDate, "yyyy-MM-ddTHH:mm:ssZ",  CultureInfo.InvariantCulture,
    DateTimeStyles.AdjustToUniversal),
   Technician = jobDto.Technician
  };
 }
 
 public void UpdateInstance(Job job)
 {
  if (job == null)
   throw new ArgumentNullException(nameof(job), "Source cannot be null.");
  
  this.JobType = job.JobType;
  this.CustomerName = job.CustomerName;
  this.Status = job.Status;
  this.AppointmentDate = job.AppointmentDate;
  this.Technician = job.Technician;
 }
 
 public int Id { get; set; }
 public string CustomerName { get; set; }
 public string JobType { get; set; }
 public string Status { get; set; }
 public DateTime AppointmentDate { get; set; }
 public string Technician { get; set; }
}