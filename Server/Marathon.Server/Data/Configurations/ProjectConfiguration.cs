namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> project)
        {
            project.HasMany(x => x.TeamsProjects)
                .WithOne(x => x.Project)
                .HasForeignKey(x => x.ProjectId);
        }
    }
}
