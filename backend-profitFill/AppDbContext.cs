using backend_profitFill.Model;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // Set the default schema for all entities
       modelBuilder.HasDefaultSchema("profitFill");
    
     }
    public DbSet<Job?> job { get; set; }
}