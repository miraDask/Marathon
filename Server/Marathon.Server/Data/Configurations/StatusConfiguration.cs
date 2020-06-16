namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class StatusConfiguration : IEntityTypeConfiguration<Status>
    {
        public void Configure(EntityTypeBuilder<Status> status)
        {
            status.HasMany(x => x.SprintsStatuses)
                .WithOne(x => x.Status)
                .HasForeignKey(x => x.StatusId);
        }
    }
}
