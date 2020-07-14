namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Features.Sprints.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants.Errors;

    public class SprinstService : ISprintsService
    {
        private const int DaysInWeek = 7;
        private readonly MarathonDbContext dbContext;

        public SprinstService(MarathonDbContext dbContext)
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

        public async Task<ResultModel<bool>> DeleteAsync(int sprintId, int projectId)
        {
            var sprint = await this.GetByIdAndProjectIdAsync(sprintId, projectId);

            if (sprint == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidSprintId },
                };
            }

            sprint.IsDeleted = true;
            sprint.DeletedOn = DateTime.UtcNow;

            this.dbContext.Sprints.Update(sprint);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
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
                        StoryPoints = x.StoryPoints,
                        Status = x.Status,
                    }),
                    Estimate = x.Issues.Sum(x => x.StoryPoints),
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

        public async Task<ResultModel<bool>> AssignIssueToSprintAsync(int projectId, int sprintId, int issueId)
        {
            var sprint = await this.GetByIdAndProjectIdAsync(sprintId, projectId);

            if (sprint == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidSprintId },
                };
            }

            var issue = await this.dbContext.Issues.FirstOrDefaultAsync(x => x.Id == issueId && x.ProjectId == projectId);

            if (issue == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidIssueId },
                };
            }

            issue.SprintId = sprintId;

            this.dbContext.Update(issue);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> RemoveIssueFromSprintAsync(int sprintId, int issueId)
        {
            var issue = await this.dbContext.Issues.FirstOrDefaultAsync(x => x.Id == issueId && x.SprintId == sprintId);

            if (issue == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidIssueId },
                };
            }

            issue.SprintId = null;
            this.dbContext.Update(issue);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> UpdateAsync(int sprintId, int projectId, string title, string goal, int weeks, DateTime startDate)
        {
            var sprint = await this.GetByIdAndProjectIdAsync(sprintId, projectId);

            if (sprint == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidSprintId },
                };
            }

            sprint.Title = title;
            sprint.Goal = goal;
            sprint.DurationInWeeks = weeks;
            sprint.StartDate = startDate;
            sprint.EndDate = startDate.Add(TimeSpan.FromDays(weeks * DaysInWeek)).ToUniversalTime();
            sprint.ModifiedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        private async Task<Sprint> GetByIdAndProjectIdAsync(int sprintId, int projectId)
         => await this.dbContext
                      .Sprints
                      .FirstOrDefaultAsync(x => x.Id == sprintId && x.ProjectId == projectId);
    }
}
