namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Sprints.Models;

    public interface ISprintsService
    {
        Task<SprintListingServiceModel> CreateAsync(int projectId);

        Task<ResultModel<bool>> UpdateAsync(int sprintId, int projectId, string title, string goal, DateTime? startDate, DateTime? endDate);

        Task<ResultModel<bool>> DeleteAsync(int sprintId, int projectId);

        Task<ResultModel<bool>> ArchiveAsync(int sprintId, int projectId);

        Task<int> GetIssuesCount(int sprintId);

        Task<ResultModel<IEnumerable<SprintListingServiceModel>>> GetAllByProjecIdAsync(int projectId);

        Task<ResultModel<SprintDetailsServiceModel>> GetDetailsAsync(int sprintId, int projectId);

        Task<ResultModel<bool>> AssignIssueToSprintAsync(int projectId, int sprintId, int issueId);

        Task<ResultModel<bool>> RemoveIssueFromSprintAsync(int sprintId, int issueId);
    }
}
