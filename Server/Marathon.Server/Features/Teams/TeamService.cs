namespace Marathon.Server.Features.Teams
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Teams.Models;
    using Microsoft.EntityFrameworkCore;

    public class TeamService : ITeamService
    {
        private readonly MarathonDbContext dbContext;

        public TeamService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> AddUserToTeamAsync(User user, int teamId)
        {
            var team = await this.GetByIdAsync(teamId);

            if (team == null)
            {
                return false;
            }

            var teamUser = new TeamUser()
            {
                Team = team,
                User = user,
            };

            await this.dbContext.TeamsUsers.AddAsync(teamUser);
            await this.dbContext.SaveChangesAsync();

            return true;
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

        public async Task<bool> DeleteAsync(int id)
        {
            var team = await this.GetByIdAsync(id);

            if (team == null)
            {
                return false;
            }

            team.IsDeleted = true;
            team.DeletedOn = DateTime.UtcNow;

            this.dbContext.Teams.Update(team);

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<TeamListingServiceModel>> GetAllByProjectIdAsync(int id)
        => await this.dbContext
                .Teams
                .Where(x => x.ProjectId == id)
                .Select(x => new TeamListingServiceModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    ImageUrl = x.Title,
                })
                .ToListAsync();

        public async Task<TeamDetailsServiceModel> GetDetailsAsync(int id)
        => await this.dbContext
                .Teams
                .Where(x => x.Id == id)
                .Select(x => new TeamDetailsServiceModel()
                {
                    Title = x.Title,
                    ImageUrl = x.ImageUrl,
                    TeamUsers = x.TeamsUsers.Select(x => new UserInTeamListingServerModel()
                    {
                        Id = x.User.Id,
                        UserName = x.User.UserName,
                        ImageUrl = x.User.ImageUrl,
                    }),
                })
                .FirstOrDefaultAsync();

        public async Task<bool> RemoveUserFromTeamAsync(string userId, int teamId)
        {
            var teamUser = await this.dbContext.TeamsUsers.FirstOrDefaultAsync(x => x.UserId == userId && x.TeamId == teamId );
            if (teamUser == null)
            {
                return false;
            }

            this.dbContext.TeamsUsers.Remove(teamUser);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateAsync(int id, string title, string imageUrl, int projectId)
        {
            var team = await this.GetByIdAsync(id);

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

        private async Task<Team> GetByIdAsync(int id)
        => await this.dbContext
                .Teams
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
    }
}
