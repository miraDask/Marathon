namespace Marathon.Server.Features.Statuses
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Cache;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Status.Models;
    using Marathon.Server.Features.Statuses.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Data.Common.Constants.Seeding;
    using static Marathon.Server.Features.Common.Constants;

    public class StatusesService : IStatusesService
    {
        private readonly MarathonDbContext dbContext;
        private readonly ICacheService cacheService;

        public StatusesService(MarathonDbContext dbContext, ICacheService cacheService)
        {
            this.dbContext = dbContext;
            this.cacheService = cacheService;
        }

        public async Task<int> CreateAsync(string name, int projectId)
        {
            var existingStatus = await this.dbContext.Statuses.FirstOrDefaultAsync(x => x.Name == name && x.ProjectId == projectId);

            if (existingStatus != null)
            {
                return existingStatus.Id;
            }

            var status = new Status
            {
                Name = name,
                ProjectId = projectId,
            };

            await this.dbContext.AddAsync(status);
            await this.dbContext.SaveChangesAsync();

            return status.Id;
        }

        public async Task<ResultModel<bool>> DeleteAsync(int statusId)
        {
            var status = await this.GetByIdAsync(statusId);

            if (status == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidStatusId },
                };
            }

            status.IsDeleted = true;
            status.DeletedOn = DateTime.UtcNow;

            this.dbContext.Statuses.Update(status);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<AllStatusesResponseModel>> GetAllForSprintAsync(int sprintId)
        {
            var statuses = await this.dbContext
                .Statuses
                .Where(x => x.SprintsStatuses.Any(x => x.SprintId == sprintId))
                .Select(x => new StatusListingModel
                {
                    Id = x.Id,
                    Name = x.Name,
                })
                .ToListAsync();

            if (statuses == null)
            {
                return new ResultModel<AllStatusesResponseModel>
                {
                    Errors = new string[] { Errors.InvalidSprintId },
                };
            }

            return new ResultModel<AllStatusesResponseModel>
            {
                Success = true,
                Result = new AllStatusesResponseModel
                {
                    Id = sprintId,
                    Statuses = statuses,
                },
            };
        }

        public async Task<ResultModel<AllStatusesResponseModel>> GetAllForProjectAsync(int projectId)
        {
            var statuses = await this.dbContext
                .Statuses
                .Where(x => x.ProjectId == projectId)
                .Select(x => new StatusListingModel
                {
                    Id = x.Id,
                    Name = x.Name,
                })
                .ToListAsync();

            if (statuses == null)
            {
                return new ResultModel<AllStatusesResponseModel>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            return new ResultModel<AllStatusesResponseModel>
            {
                Success = true,
                Result = new AllStatusesResponseModel
                {
                    Id = projectId,
                    Statuses = statuses,
                },
            };
        }

        public async Task<ResultModel<bool>> UpdateAsync(int statusId, string name)
        {
            var status = await this.GetByIdAsync(statusId);

            if (status == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidStatusId },
                };
            }

            status.Name = name;
            this.dbContext.Update(status);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task CreateInitialToDoStatusAsync(int projectId)
        {
            var toDoStatusId = await this.CreateAsync(ToDoStatus, projectId);
            await this.cacheService.SetAsync(projectId.ToString(), toDoStatusId.ToString());
        }

        private async Task<Status> GetByIdAsync(int statusId)
        => await this.dbContext.Statuses.FirstOrDefaultAsync(x => x.Id == statusId);
    }
}
