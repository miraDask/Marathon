namespace Marathon.Server.Features.Issues
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
    using Marathon.Server.Features.Projects;
    using Marathon.Server.Features.Sprints;
    using Marathon.Server.Features.Sprints.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants.Errors;

    public class IssuesService : IIssuesService
    {
        private readonly MarathonDbContext dbContext;
        private readonly IProjectsService projectsService;
        private readonly ISprintsService sprintsService;

        public IssuesService(MarathonDbContext dbContext, IProjectsService projectsService, ISprintsService sprintsService)
        {
            this.dbContext = dbContext;
            this.projectsService = projectsService;
            this.sprintsService = sprintsService;
        }

        public async Task<int> CreateAsync(int projectId, string userId, CreateIssueRequestModel model)
        {
            var backLogIndex = model.SprintId == null ? await this.projectsService.GetIssuesWithoutSprintsCount(projectId)
                : await this.sprintsService.GetIssuesCount((int)model.SprintId);

            var issue = new Issue
            {
                Title = model.Title,
                Description = model.Description,
                StoryPoints = model.StoryPoints,
                Priority = model.Priority,
                Type = model.Type,
                ReporterId = userId,
                AssigneeId = null,
                Status = model.Status,
                SprintId = model.SprintId,
                ParentIssueId = null,
                ProjectId = projectId,
                BacklogIndex = backLogIndex,
                StatusIndex = await this.projectsService.GetIssuesByStatusCount(projectId, model.Status),
            };

            this.dbContext.Issues.Add(issue);

            await this.dbContext.SaveChangesAsync();
            return issue.Id;
        }

        public async Task<ResultModel<bool>> DeleteAsync(int issueId, int projectId)
        {
            var issue = await this.GetByIdAndProjectIdAsync(issueId, projectId);

            if (issue == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidIssueId },
                };
            }

            issue.IsDeleted = true;
            issue.DeletedOn = DateTime.UtcNow;

            this.dbContext.Issues.Update(issue);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<IEnumerable<IssueListingServiceModel>>> GetAllByProjecIdAsync(int id)
        {
            var getAllIssuesResult = await this.dbContext
                .Issues
                .Where(x => x.ProjectId == id)
                .Select(x => new IssueListingServiceModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Status = x.Status,
                    StoryPoints = x.StoryPoints,
                    Priority = x.Priority,
                    Type = x.Type,
                    SprintId = x.SprintId,
                })
                .ToListAsync();

            if (getAllIssuesResult == null)
            {
                return new ResultModel<IEnumerable<IssueListingServiceModel>>
                {
                    Errors = new string[] { InvalidProjectId },
                };
            }

            return new ResultModel<IEnumerable<IssueListingServiceModel>>
            {
                Success = true,
                Result = getAllIssuesResult,
            };
        }

        public async Task<ResultModel<IssueDetailsServiceModel>> GetDetailsAsync(int id, int projectId)
        {
            var issue = await this.dbContext
                .Issues
                .Where(x => x.Id == id && x.ProjectId == projectId)
                .Select(x => new IssueDetailsServiceModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    IsResolved = x.IsResolved,
                    StoryPoins = x.StoryPoints,
                    Priority = x.Priority.ToString(),
                    Type = x.Type.ToString(),
                    Status = x.Status,
                    Sprint = new SprintListingServiceModel
                    {
                        Id = x.Sprint.Id,
                        Title = x.Sprint.Title,
                    },
                    ParentIssue = new IssueListingServiceModel
                    {
                        Id = x.ParentIssue.Id,
                        Title = x.ParentIssue.Title,
                        Status = x.Status,
                    },
                    Reporter = new UserListingServerModel
                    {
                        Id = x.Reporter.Id,
                        FullName = x.Reporter.FullName,
                        ImageUrl = x.Reporter.ImageUrl,
                    },
                    Assignee = new UserListingServerModel
                    {
                        Id = x.Assignee.Id,
                        FullName = x.Assignee.FullName,
                        ImageUrl = x.Assignee.ImageUrl,
                    },
                    ChildIssues = x.ChildIssues.Select(x => new IssueListingServiceModel
                    {
                        Id = x.Id,
                        Title = x.Title,
                        StoryPoints = x.StoryPoints,
                        Status = x.Status,
                    }),
                })
                .FirstOrDefaultAsync();

            if (issue == null)
            {
                return new ResultModel<IssueDetailsServiceModel>
                {
                    Errors = new string[] { InvalidIssueId },
                };
            }

            return new ResultModel<IssueDetailsServiceModel>
            {
                Success = true,
                Result = issue,
            };
        }

        public async Task<ResultModel<bool>> UpdateAsync(int issueId, int projectId, UpdateIssueRequestModel model)
        {
            var issue = await this.GetByIdAndProjectIdAsync(issueId, projectId);

            if (issue == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidIssueId },
                };
            }

            if (issue.SprintId != model.SprintId)
            {
                await this.ReorderOldSprintBackLogIndexes(projectId, issue.BacklogIndex, issue.SprintId);
                await this.ReorderNewSprintBackLogIndexes(projectId, model.BacklogIndex, model.SprintId);
            }
            else
            {
                await this.ReorderSameSprintBackLogIndexes(projectId, issue.Id, issue.BacklogIndex, model.BacklogIndex, model.SprintId);
            }

            issue.Title = model.Title;
            issue.Description = model.Description;
            issue.StoryPoints = model.StoryPoints;
            issue.Priority = model.Priority;
            issue.Type = model.Type;
            issue.Status = model.Status;
            issue.AssigneeId = model.AssigneeId;
            issue.SprintId = model.SprintId;
            issue.ParentIssueId = model.ParentIssueId;
            issue.StatusIndex = model.StatusIndex;
            issue.BacklogIndex = model.BacklogIndex;
            issue.ModifiedOn = DateTime.UtcNow;

            this.dbContext.Update(issue);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> ChangeStatusAsync(int issueId, Status status, int projectId)
        {
            var issue = await this.GetByIdAndProjectIdAsync(issueId, projectId);

            if (issue == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidIssueId },
                };
            }

            issue.Status = status;
            issue.ModifiedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        private async Task ReorderOldSprintBackLogIndexes(int projectId, int oldIndex, int? oldSprintId)
        {
            var issues = await this.dbContext.Issues
                .Where(x => x.ProjectId == projectId && x.SprintId == oldSprintId && x.BacklogIndex > oldIndex)
                .ToListAsync();

            issues.ForEach(x =>
            {
                x.BacklogIndex -= 1;
                this.dbContext.Update(x);
            });
            await this.dbContext.SaveChangesAsync();
        }

        private async Task ReorderNewSprintBackLogIndexes(int projectId, int newIndex, int? newSprintId)
        {
            var issues = await this.dbContext.Issues
                .Where(x => x.ProjectId == projectId && x.SprintId == newSprintId && x.BacklogIndex >= newIndex)
                .ToListAsync();

            issues.ForEach(x =>
            {
                x.BacklogIndex += 1;
                this.dbContext.Update(x);
            });
            await this.dbContext.SaveChangesAsync();
        }

        private async Task ReorderSameSprintBackLogIndexes(int projectId, int issueId, int oldIndex, int newIndex, int? sprintId)
        {
            var issues = await this.dbContext.Issues
                .Where(x => x.ProjectId == projectId && x.SprintId == sprintId && x.Id != issueId)
                .ToListAsync();

            if (newIndex < oldIndex)
            {
                issues.ForEach(x =>
                {
                    if (x.BacklogIndex >= newIndex && x.BacklogIndex < oldIndex)
                    {
                        x.BacklogIndex += 1;
                        this.dbContext.Update(x);
                    }
                });
            }
            else if (newIndex > oldIndex)
            {
                issues.ForEach(x =>
                {
                    if (x.BacklogIndex > oldIndex && x.BacklogIndex <= newIndex)
                    {
                        x.BacklogIndex -= 1;
                        this.dbContext.Update(x);
                    }
                });
            }

            await this.dbContext.SaveChangesAsync();
        }

        private async Task<Issue> GetByIdAndProjectIdAsync(int issueId, int projectId)
            => await this.dbContext.Issues.FirstOrDefaultAsync(x => x.Id == issueId && x.ProjectId == projectId);
    }
}
