namespace Marathon.Server.Features.Teams
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class TeamService : ITeamService
    {
        private readonly MarathonDbContext dbContext;

        public TeamService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(string title, string imageUrl, int projectId)
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

        public async Task<bool> UpdateAsync(int id, string title, string imageUrl, int projectId)
        {
            var team = await this.GetById(id);

            if (team == null)
            {
                return false;
            }

            team.Title = title;
            team.ImageUrl = imageUrl;
            team.ProjectId = projectId;
            team.ModifiedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Team> GetById(int id)
        => await this.dbContext
                .Teams
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();
    }
}
