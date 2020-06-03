namespace Marathon.Server.Data.Configurations
{
    using Marathon.Server.Data.Models;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class TeamUserConfiguration : IEntityTypeConfiguration<TeamUser>
    {
        public void Configure(EntityTypeBuilder<TeamUser> teamUser)
        {
            teamUser.HasKey(x => new { x.TeamId, x.UserId });
        }
    }
}
