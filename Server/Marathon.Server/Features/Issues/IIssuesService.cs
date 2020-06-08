namespace Marathon.Server.Features.Issues
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Issues.Models;

    public interface IIssuesService
    {
        Task<int> CreateAsync(int projectId, string userId, CreateIssueRequestModel createIssueRequestModel);

        Task<ResultModel<bool>> UpdateAsync(int id, UpdateIssueRequestModel updateIssueRequestModel);

        Task<ResultModel<bool>> DeleteAsync(int id);

        Task<ResultModel<IEnumerable<IssueListingServiceModel>>> GetAllByProjecIdAsync(int id);

        Task<ResultModel<IssueDetailsServiceModel>> GetDetailsAsync(int id);
    }
}
