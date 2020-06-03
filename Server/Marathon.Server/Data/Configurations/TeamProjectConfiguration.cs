namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class TeamProjectConfiguration : IEntityTypeConfiguration<TeamProject>
    {
        public void Configure(EntityTypeBuilder<TeamProject> teamProject)
        {
            teamProject.HasKey(x => new { x.TeamId, x.ProjectId});
        }
    }
}
