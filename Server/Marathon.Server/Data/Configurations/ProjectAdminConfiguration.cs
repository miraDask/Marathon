namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class ProjectAdminConfiguration : IEntityTypeConfiguration<ProjectAdmin>
    {
        public void Configure(EntityTypeBuilder<ProjectAdmin> entity)
        {
            entity.HasKey(x => new { x.UserId, x.ProjectId });
        }
    }
}
