namespace Marathon.Server.Features.Projects
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Projects.Models;
    using Marathon.Server.Features.Teams.Models;
    using Microsoft.EntityFrameworkCore;

    public class ProjectsService : IProjectsService
    {
        private readonly MarathonDbContext dbContext;

        public ProjectsService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(string name, string key, string imageUrl, string userId)
        {
            var project = new Project
            {
                Name = name,
                Key = key,
                ImageUrl = imageUrl,
                CreatorId = userId,
            };

            this.dbContext.Projects.Add(project);

            await this.dbContext.SaveChangesAsync();

            return project.Id;
        }

        public async Task<bool> UpdateAsync(int id, string name, string key, string imageUrl)
        {
            var project = await this.GetByIdAsync(id);

            if (project == null)
            {
                return false;
            }

            project.Name = name;
            project.ImageUrl = imageUrl;
            project.Key = key;
            project.ModifiedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await this.GetByIdAsync(id);

            if (project == null)
            {
                return false;
            }

            project.IsDeleted = true;
            project.DeletedOn = DateTime.UtcNow;

            this.dbContext.Projects.Update(project);

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<ProjectListingServiceModel>> GetAllByUserIdAsync(string id)
        => await this.dbContext
                .Projects
                .Where(x => x.CreatorId == id || x.Teams.Any(x => x.TeamsUsers.Any(x => x.UserId == id)))
                .Select(x => new ProjectListingServiceModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Key = x.Key,
                    ImageUrl = x.ImageUrl,
                    IsCurrentUserCreator = x.CreatorId == id,
                })
                .ToListAsync();

        public async Task<ProjectDetailsServiceModel> GetDetailsAsync(int id)
        {
            var project = await this.dbContext
                .Projects
                .Where(x => x.Id == id)
                .Select(x => new ProjectDetailsServiceModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    ImageUrl = x.ImageUrl,
                    Key = x.Key,
                    Creator = new UserListingServerModel
                    {
                        Id = x.Creator.Id,
                        UserName = x.Creator.UserName,
                        ImageUrl = x.Creator.ImageUrl,
                    },
                    Teams = x.Teams.Select(x => new TeamListingServiceModel
                    {
                        Id = x.Id,
                        Title = x.Title,
                        ImageUrl = x.ImageUrl,
                    }),
                })
                .FirstOrDefaultAsync();

            return project;
        }

        public async Task<bool> AddTeamToProjectAsync(int projectId, int teamId)
        {
            var project = await this.GetByIdAsync(projectId);

            if (project == null)
            {
                return false;
            }

            var team = await this.dbContext.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (team == null)
            {
                return false;
            }

            project.Teams.Add(team);
            this.dbContext.Update(project);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveTeamFromProjectAsync(int projectId, int teamId)
        {
            var project = await this.GetByIdAsync(projectId);

            if (project == null)
            {
                return false;
            }

            var team = await this.dbContext.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (team == null)
            {
                return false;
            }

            project.Teams.Remove(team);
            this.dbContext.Update(project);
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Project> GetByIdAsync(int id)
            => await this.dbContext
                    .Projects
                    .Where(x => x.Id == id)
                    .FirstOrDefaultAsync();
    }
}