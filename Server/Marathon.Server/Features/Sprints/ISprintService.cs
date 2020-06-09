namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Sprints.Models;

    public interface ISprintService
    {
        Task<int> CreateAsync(int projectId, string title, string goal, int weeks, DateTime startDate);

        Task<ResultModel<IEnumerable<SprintListingServiceModel>>> GetAllByProjecIdAsync(int projectId);
    }
}
