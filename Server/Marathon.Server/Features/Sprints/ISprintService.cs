namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ISprintService
    {
        Task<int> CreateAsync(int projectId, string title, string goal, int weeks, DateTime startDate);
    }
}
