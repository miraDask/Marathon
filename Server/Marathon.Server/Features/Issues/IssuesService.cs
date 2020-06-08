namespace Marathon.Server.Features.Issues
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Features.Sprints.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants.Errors;

    public class IssuesService : IIssuesService
    {
        private readonly MarathonDbContext dbContext;

        public IssuesService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(int projectId, string userId, CreateIssueRequestModel model)
        {
            var issue = new Issue
            {
                Title = model.Title,
                Description = model.Description,
                StoryPoins = model.StoryPoins,
                Priority = model.Priority,
                Type = model.Type,
                ReporterId = userId,
                AssigneeId = model.IsAssignedToCreator == true ? userId : null,
                StatusId = model.StatusId,
                SprintId = model.SprintId,
                ParentIssueId = model.ParentIssueId,
                ProjectId = projectId,
            };

            this.dbContext.Issues.Add(issue);

            await this.dbContext.SaveChangesAsync();
            return issue.Id;
        }

        public async Task<ResultModel<bool>> DeleteAsync(int id)
        {
            var issue = await this.GetByIdAsync(id);

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
            var getAllUssuesResult = await this.dbContext
                .Issues
                .Where(x => x.ProjectId == id)
                .Select(x => new IssueListingServiceModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    StatusId = x.StatusId,
                    StatusName = x.Status.Name,
                })
                .ToListAsync();

            if (getAllUssuesResult == null)
            {
                return new ResultModel<IEnumerable<IssueListingServiceModel>>
                {
                    Errors = new string[] { InvalidProjectId },
                };
            }

            return new ResultModel<IEnumerable<IssueListingServiceModel>>
            {
                Success = true,
                Result = getAllUssuesResult,
            };
        }

        public async Task<ResultModel<IssueDetailsServiceModel>> GetDetailsAsync(int id)
        {
            var issue = await this.dbContext
                .Issues
                .Where(x => x.Id == id)
                .Select(x => new IssueDetailsServiceModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    IsResolved = x.IsResolved,
                    StoryPoins = x.StoryPoins,
                    Priority = x.Priority,
                    Type = x.Type,
                    Status = x.Status.Name,
                    Sprint = new SprintListingServiceModel
                    {
                        Id = x.Sprint.Id,
                        Title = x.Sprint.Title,
                    },
                    ParentIssue = new IssueListingServiceModel
                    {
                        Id = x.Id,
                        Title = x.Title,
                        StatusId = x.StatusId,
                        StatusName = x.Status.Name,
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
                        StatusId = x.StatusId,
                        StatusName = x.Status.Name,
                    }),
                })
                .FirstOrDefaultAsync();

            if (issue == null)
            {
                return new ResultModel<IssueDetailsServiceModel>
                {
                    Errors = new string[] { InvalidProjectId },
                };
            }

            return new ResultModel<IssueDetailsServiceModel>
            {
                Success = true,
                Result = issue,
            };
        }

        public async Task<ResultModel<bool>> UpdateAsync(int id, UpdateIssueRequestModel model)
        {
            var issue = await this.GetByIdAsync(id);

            if (issue == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { InvalidProjectId },
                };
            }

            issue.Title = model.Title;
            issue.Description = model.Description;
            issue.StoryPoins = model.StoryPoins;
            issue.Priority = model.Priority;
            issue.Type = model.Type;
            issue.StatusId = model.StatusId;
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

        private async Task<Issue> GetByIdAsync(int id) => await this.dbContext.Issues.FirstOrDefaultAsync(x => x.Id == id);
    }
}
