namespace Marathon.Server.Features.Teams
{
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;

    public class TeamService : ITeamService
    {
        private readonly MarathonDbContext dbContext;

        public TeamService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> Create(string title, string imageUrl, int projectId)
        {
            var team = new Team
            {
                Title = title,
                ImageUrl = imageUrl,
                ProjectId = projectId,
            };

            this.dbContext.Add(team);

            await this.dbContext.SaveChangesAsync();

            return team.Id;
        }
    }
}
