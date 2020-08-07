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
    using Marathon.Server.Features.Hubs;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Issues;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Features.Sprints.Models;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants;

    public class SprinstService : ISprintsService
    {
        private readonly MarathonDbContext dbContext;
        private readonly IIssuesService issuesService;
        private readonly IHubContext<UpdatesHub> hub;

        public SprinstService(MarathonDbContext dbContext, IIssuesService issuesService, IHubContext<UpdatesHub> hub)
        {
            this.dbContext = dbContext;
            this.issuesService = issuesService;
            this.hub = hub;
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

            await this.hub.Clients.Group(projectId.ToString()).SendAsync(HubEvents.BacklogUpdate, true);

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

            await this.hub.Clients.Group(projectId.ToString()).SendAsync(HubEvents.BacklogUpdate, true);

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
                    RemainingDays = ((DateTime)x.EndDate - DateTime.Now).Days,
                    Estimate = x.Issues.Sum(x => x.StoryPoints),
                    TodoIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 0),
                        Issues = x.Issues.Where(x => x.Status == Status.ToDo).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            Description = x.Description,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                FullName = x.Assignee.FullName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }).OrderBy(x => x.StatusIndex),
                    },
                    DevelopmentIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 1),
                        Issues = x.Issues.Where(x => x.Status == Status.Development).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            Description = x.Description,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                FullName = x.Assignee.FullName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }).OrderBy(x => x.StatusIndex),
                    },
                    TestingIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 2),
                        Issues = x.Issues.Where(x => x.Status == Status.Testing).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            Description = x.Description,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                FullName = x.Assignee.FullName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }).OrderBy(x => x.StatusIndex),
                    },
                    DoneIssues = new SprintStatusesListingModel
                    {
                        Title = Enum.GetName(typeof(Status), 3),
                        Issues = x.Issues.Where(x => x.Status == Status.Done).Select(x => new IssueListingServiceModel
                        {
                            Title = x.Title,
                            Id = x.Id,
                            Description = x.Description,
                            StoryPoints = x.StoryPoints,
                            Type = x.Type,
                            Priority = x.Priority,
                            Status = x.Status,
                            BacklogIndex = x.BacklogIndex,
                            StatusIndex = x.StatusIndex,
                            Assignee = new UserListingServerModel
                            {
                                Id = x.Assignee.Id,
                                FullName = x.Assignee.FullName,
                                ImageUrl = x.Assignee.ImageUrl,
                            },
                        }).OrderBy(x => x.StatusIndex),
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

            await this.hub.Clients.Group(projectId.ToString()).SendAsync(HubEvents.BacklogUpdate, true);

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> CompleteAsync(int oldSprintId, int? newSprintId, int projectId)
        {
            var sprint = await this.GetByIdAndProjectIdAsync(oldSprintId, projectId);

            if (sprint == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidSprintId },
                };
            }

            await this.issuesService.ChangeIssuesSprint(oldSprintId, newSprintId);

            sprint.Active = false;
            sprint.Archived = true;
            sprint.ModifiedOn = DateTime.UtcNow;

            this.dbContext.Update(sprint);
            await this.dbContext.SaveChangesAsync();

            await this.hub.Clients.Group(projectId.ToString()).SendAsync(HubEvents.SprintCompletedUpdate, true);

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
