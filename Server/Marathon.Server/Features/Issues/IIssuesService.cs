﻿namespace Marathon.Server.Features.Issues
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Enumerations;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Issues.Models;

    public interface IIssuesService
    {
        Task<int> CreateAsync(int projectId, string userId, CreateIssueRequestModel createIssueRequestModel);

        Task<ResultModel<bool>> UpdateAsync(int issueId, int projectId, UpdateIssueRequestModel updateIssueRequestModel);

        Task<ResultModel<bool>> ChangeStatusAsync(int issueId, Status status, int projectId);

        Task<ResultModel<bool>> DeleteAsync(int issueId, int projectId);

        Task<ResultModel<IEnumerable<IssueListingServiceModel>>> GetAllByProjecIdAsync(int id);

        Task<ResultModel<IssueDetailsServiceModel>> GetDetailsAsync(int id, int projectId);
    }
}
