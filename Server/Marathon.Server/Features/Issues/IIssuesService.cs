namespace Marathon.Server.Features.Issues
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Enumerations;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Issues.Models;

    public interface IIssuesService
    {
        Task<int> CreateAsync(int projectId, string userId, CreateIssueRequestModel createIssueRequestModel);

        Task<ResultModel<bool>> UpdateAsync(int issueId, int projectId, UpdateIssueRequestModel updateIssueRequestModel);

        Task<ResultModel<UserListingServerModel>> ChangeStatusAsync(int issueId, Status status, int statusIndex, int projectId, string userId);

        Task<ResultModel<bool>> DeleteAsync(int issueId, int projectId);

        Task SetIssuesOfRemovedFromTeamUserToNull(int projectId, string assigneeId);

        Task<ResultModel<IEnumerable<IssueListingServiceModel>>> GetAllByProjecIdAsync(int id);

        Task<ResultModel<IssueDetailsServiceModel>> GetDetailsAsync(int id, int projectId);

        Task ChangeIssuesSprint(int oldSprintId, int? newSprintId);
    }
}
