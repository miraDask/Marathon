namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Features.Sprints.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants.Errors;

    public class SprintService : ISprintService
    {
        private const int DaysInWeek = 7;
        private readonly MarathonDbContext dbContext;

        public SprintService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(int projectId, string title, string goal, int weeks, DateTime startDate)
        {
            var duration = TimeSpan.FromDays(weeks * DaysInWeek);

            var sprint = new Sprint
            {
                Title = title,
                Goal = goal,
                ProjectId = projectId,
                DurationInWeeks = weeks,
                StartDate = startDate.ToUniversalTime(),
                EndDate = startDate.Add(duration).ToUniversalTime(),
            };

            await this.dbContext.AddAsync(sprint);
            await this.dbContext.SaveChangesAsync();

            return sprint.Id;
        }

        public async Task<ResultModel<IEnumerable<SprintListingServiceModel>>> GetAllByProjecIdAsync(int projectId)
        {
            var getAllSprintsResult = await this.dbContext
                .Sprints
                .Where(x => x.ProjectId == projectId)
                .Select(x => new SprintListingServiceModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                })
                .ToListAsync();

            if (getAllSprintsResult == null)
            {
                return new ResultModel<IEnumerable<SprintListingServiceModel>>
                {
                    Errors = new string[] { InvalidProjectId },
                };
            }

            return new ResultModel<IEnumerable<SprintListingServiceModel>>
            {
                Success = true,
                Result = getAllSprintsResult,
            };
        }

        public async Task<ResultModel<SprintDetailsServiceModel>> GetDetailsAsync(int sprintId, int projectId)
        {
            var sprint = await this.dbContext
                .Sprints
                .Where(x => x.Id == sprintId && x.ProjectId == projectId)
                .Select(x => new SprintDetailsServiceModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    Goal = x.Goal,
                    DurationInWeeks = x.DurationInWeeks,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate,
                    Issues = x.Issues.Select(x => new IssueListingServiceModel
                    {
                        Id = x.Id,
                        Title = x.Title,
                        StatusId = x.StatusId,
                        StatusName = x.Status.Name,
                    }),
                })
                .FirstOrDefaultAsync();

            if (sprint == null)
            {
                return new ResultModel<SprintDetailsServiceModel>
                {
                    Errors = new string[] { InvalidSprintId },
                };
            }

            return new ResultModel<SprintDetailsServiceModel>
            {
                Success = true,
                Result = sprint,
            };
        }
    }
}
