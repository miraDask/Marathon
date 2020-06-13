namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class SprintsConfiguration : IEntityTypeConfiguration<Sprint>
    {
        public void Configure(EntityTypeBuilder<Sprint> sprint)
        {
            sprint.HasMany(x => x.SprintsStatuses)
                .WithOne(x => x.Sprint)
                .HasForeignKey(x => x.SprintId);
        }
    }
}
