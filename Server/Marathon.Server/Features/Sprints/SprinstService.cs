namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Enumerations;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Features.Sprints.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants;

    public class SprinstService : ISprintsService
    {
        private const int DaysInWeek = 7;
        private readonly MarathonDbContext dbContext;

        public SprinstService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<SprintListingServiceModel> CreateAsync(int projectId)
        {
            var sprintsCount = await this.dbContext.Sprints.CountAsync(x => x.ProjectId == projectId);

            var sprint = new Sprint
            {
                Title = string.Format(DefaultSprintName, sprintsCount + 1),
                Goal = string.Empty,
                ProjectId = projectId,
                DurationInWeeks = null,
                StartDate = null,
                EndDate = null,
                Archived = false,
                Active = false,
            };

            await this.dbContext.AddAsync(sprint);
            await this.dbContext.SaveChangesAsync();

            return new SprintListingServiceModel
            {
                Id = sprint.Id,
                Title = sprint.Title,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
            };
        }

        public async Task<ResultModel<bool>> DeleteAsync(int sprintId, int projectId)
        {
            var sprint = await this.GetByIdAndProjectIdAsync(sprintId, projectId);

            if (sprint == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidSprintId },
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
                    Errors = new string[] { Errors.InvalidProjectId },
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
                    RemainingDays = ((DateTime)x.EndDate - (DateTime)x.StartDate).Days,
                    Estimate = x.Issues.Sum(x => x.StoryPoints),
                    TodoIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 0),
                        Issues = x.Issues.Where(x => x.Status == Status.ToDo).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                UserName = x.Assignee.UserName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }),
                    },
                    DevelopmentIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 1),
                        Issues = x.Issues.Where(x => x.Status == Status.Development).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                UserName = x.Assignee.UserName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }),
                    },
                    TestingIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 2),
                        Issues = x.Issues.Where(x => x.Status == Status.Testing).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                UserName = x.Assignee.UserName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }),
                    },
                    DoneIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 3),
                        Issues = x.Issues.Where(x => x.Status == Status.Done).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                UserName = x.Assignee.UserName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }),
                    },
                })
                .FirstOrDefaultAsync();

            if (sprint == null)
            {
                return new ResultModel<SprintDetailsServiceModel>
                {
                    Errors = new string[] { Errors.InvalidSprintId },
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
                    Errors = new string[] { Errors.InvalidSprintId },
                };
            }

            var issue = await this.dbContext.Issues.FirstOrDefaultAsync(x => x.Id == issueId && x.ProjectId == projectId);

            if (issue == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidIssueId },
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
                    Errors = new string[] { Errors.InvalidIssueId },
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

        public async Task<ResultModel<bool>> UpdateAsync(int sprintId, int projectId, string title, string goal, DateTime? startDate, DateTime? endDate)
        {
            var sprint = await this.GetByIdAndProjectIdAsync(sprintId, projectId);

            if (sprint == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidSprintId },
                };
            }

            sprint.Title = title;
            sprint.Goal = goal;
            sprint.StartDate = startDate;
            sprint.EndDate = endDate;
            sprint.Active = startDate != null;
            sprint.ModifiedOn = DateTime.UtcNow;

            this.dbContext.Update(sprint);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> ArchiveAsync(int sprintId, int projectId)
        {
            var sprint = await this.GetByIdAndProjectIdAsync(sprintId, projectId);

            if (sprint == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidSprintId },
                };
            }

            sprint.Active = false;
            sprint.Archived = true;
            sprint.ModifiedOn = DateTime.UtcNow;

            this.dbContext.Update(sprint);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<int> GetIssuesCount(int sprintId)
        => await this.dbContext.Sprints
                .Where(x => x.Id == sprintId)
                .Select(x => x.Issues.Count())
                .FirstOrDefaultAsync();

        private async Task<Sprint> GetByIdAndProjectIdAsync(int sprintId, int projectId)
         => await this.dbContext
                      .Sprints
                      .FirstOrDefaultAsync(x => x.Id == sprintId && x.ProjectId == projectId);

        private DateTime? GetEndDate(DateTime? startDate, int? weeks)
        {
            if (startDate == null)
            {
                return startDate;
            }

            var convertedStartDate = (DateTime)startDate;
            return convertedStartDate.Add(TimeSpan.FromDays((int)weeks * DaysInWeek)).ToUniversalTime();
        }
    }
}
