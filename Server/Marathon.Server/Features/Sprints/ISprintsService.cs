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

        Task<ResultModel<bool>> CompleteAsync(int oldSprintId, int? newSprintId, int projectId);

        Task<ResultModel<IEnumerable<SprintListingServiceModel>>> GetAllByProjecIdAsync(int projectId);

        Task<ResultModel<SprintDetailsServiceModel>> GetDetailsAsync(int sprintId, int projectId);
    }
}
