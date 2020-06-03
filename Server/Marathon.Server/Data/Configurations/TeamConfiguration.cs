namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class TeamConfiguration : IEntityTypeConfiguration<Team>
    {
        public void Configure(EntityTypeBuilder<Team> team)
        {
            team.HasMany(x => x.TeamsUsers)
                .WithOne(x => x.Team)
                .HasForeignKey(x => x.TeamId);
        }
    }
}
