namespace Marathon.Server.Features.Projects
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Projects.Models;
    using Marathon.Server.Features.Teams.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants;

    public class ProjectsService : IProjectsService
    {
        private readonly MarathonDbContext dbContext;
        private readonly IIdentityService identityService;
        private readonly UserManager<User> userManager;

        public ProjectsService(
            MarathonDbContext dbContext,
            IIdentityService identityService,
            UserManager<User> userManager)
        {
            this.dbContext = dbContext;
            this.identityService = identityService;
            this.userManager = userManager;
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

        public async Task<ResultModel<bool>> UpdateAsync(int id, string name, string key, string imageUrl)
        {
            var project = await this.GetByIdAsync(id);

            if (project == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            project.Name = name;
            project.ImageUrl = imageUrl;
            project.Key = key;
            project.ModifiedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> DeleteAsync(int id)
        {
            var project = await this.GetByIdAsync(id);

            if (project == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            project.IsDeleted = true;
            project.DeletedOn = DateTime.UtcNow;

            this.dbContext.Projects.Update(project);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<IEnumerable<ProjectListingServiceModel>> GetAllByUserIdAsync(string id)
        => await this.dbContext
                .Projects
                .Where(x => x.CreatorId == id
                         || x.ProjectsAdmins.Any(x => x.UserId == id)
                         || x.Teams.Any(x => x.TeamsUsers.Any(x => x.UserId == id)))
                .Select(x => new ProjectListingServiceModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Key = x.Key,
                    ImageUrl = x.ImageUrl,
                    IsCurrentUserCreator = x.CreatorId == id,
                })
                .ToListAsync();

        public async Task<ResultModel<ProjectDetailsServiceModel>> GetDetailsAsync(int id)
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

            if (project == null)
            {
                return new ResultModel<ProjectDetailsServiceModel>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            return new ResultModel<ProjectDetailsServiceModel>
            {
                Success = true,
                Result = project,
            };
        }

        public async Task<ResultModel<bool>> AddTeamToProjectAsync(int projectId, int teamId)
        {
            var project = await this.GetByIdAsync(projectId);

            if (project == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            var team = await this.dbContext.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (team == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidTeamId },
                };
            }

            project.Teams.Add(team);
            this.dbContext.Update(project);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> RemoveTeamFromProjectAsync(int projectId, int teamId)
        {
            var project = await this.GetByIdAsync(projectId);

            if (project == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            var team = await this.dbContext.Teams.FirstOrDefaultAsync(x => x.Id == teamId);

            if (team == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidTeamId },
                };
            }

            project.Teams.Remove(team);
            this.dbContext.Update(project);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> AddAdminToProjectAsync(string userId, int projectId)
        {
            var user = await this.userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidUserId },
                };
            }

            var project = await this.GetByIdAsync(projectId);

            if (project == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            var projectAdmin = new ProjectAdmin()
            {
                User = user,
                Project = project,
            };

            await this.dbContext.ProjectsAdmins.AddAsync(projectAdmin);
            await this.dbContext.SaveChangesAsync();

            await this.identityService.AddClaimToUserAsync(user.Id, Claims.Admin, projectId.ToString());

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> RemoveAdminFromProjectAsync(string userId, int projectId)
        {
            var projectAdmin = await this.dbContext.ProjectsAdmins.FirstOrDefaultAsync(x => x.UserId == userId && x.ProjectId == projectId);
            if (projectAdmin == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidUserOrProjectId },
                };
            }

            this.dbContext.ProjectsAdmins.Remove(projectAdmin);
            await this.dbContext.SaveChangesAsync();

            await this.identityService.RemoveClaimFromUserAsync(userId, Claims.Admin, projectId.ToString());
            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        private async Task<Project> GetByIdAsync(int id)
     => await this.dbContext
                  .Projects
                  .Where(x => x.Id == id)
                  .FirstOrDefaultAsync();
    }
}
