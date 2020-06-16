namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class SprintStatusConfiguration : IEntityTypeConfiguration<SprintStatus>
    {
        public void Configure(EntityTypeBuilder<SprintStatus> sprintStatus)
        {
            sprintStatus.HasKey(x => new { x.SprintId, x.StatusId });
        }
    }
}
