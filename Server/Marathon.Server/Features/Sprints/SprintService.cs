namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;

    public class SprintService : ISprintService
    {
        private const int DaysInWeek = 7;
        private readonly MarathonDbContext dbContext;

        public SprintService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(int projectId, string title, string goal, int weeks, DateTime startDate)
        {
            var duration = TimeSpan.FromDays(weeks * DaysInWeek);

            var sprint = new Sprint
            {
                Title = title,
                Goal = goal,
                ProjectId = projectId,
                DurationInWeeks = weeks,
                StartDate = startDate.ToUniversalTime(),
                EndDate = startDate.Add(duration).ToUniversalTime(),
            };

            await this.dbContext.AddAsync(sprint);
            await this.dbContext.SaveChangesAsync();

            return sprint.Id;
        }
    }
}
