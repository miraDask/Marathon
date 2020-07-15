namespace Marathon.Server.Features.Issues
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Enumerations;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Cache;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Features.Sprints.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants.Errors;

    public class IssuesService : IIssuesService
    {
        private readonly MarathonDbContext dbContext;
        private readonly ICacheService cacheService;

        public IssuesService(MarathonDbContext dbContext, ICacheService cacheService)
        {
            this.dbContext = dbContext;
            this.cacheService = cacheService;
        }

        public async Task<int> CreateAsync(int projectId, string userId, CreateIssueRequestModel model)
        {
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
                        UserName = x.Reporter.UserName,
                        ImageUrl = x.Reporter.ImageUrl,
                    },
                    Assignee = new UserListingServerModel
                    {
                        Id = x.Assignee.Id,
                        UserName = x.Assignee.UserName,
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

            issue.Title = model.Title;
            issue.Description = model.Description;
            issue.StoryPoints = model.StoryPoints;
            issue.Priority = model.Priority;
            issue.Type = model.Type;
            issue.Status = model.Status;
            issue.AssigneeId = model.AssigneeId;
            issue.SprintId = model.SprintId;
            issue.ParentIssueId = model.ParentIssueId;
            issue.ModifiedOn = DateTime.UtcNow;

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

        private async Task<Issue> GetByIdAndProjectIdAsync(int issueId, int projectId)
            => await this.dbContext.Issues.FirstOrDefaultAsync(x => x.Id == issueId && x.ProjectId == projectId);
    }
}
