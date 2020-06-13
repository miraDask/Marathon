namespace Marathon.Server.Features.Statuses
{
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;

    using static Marathon.Server.Data.Common.Constants.Seeding;

    public class StatusesService : IStatusesService
    {
        private readonly MarathonDbContext dbContext;

        public StatusesService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(string name, int projectId)
        {
            var status = new Status
            {
                Name = name,
                ProjectId = projectId,
            };

            await this.dbContext.AddAsync(status);
            await this.dbContext.SaveChangesAsync();

            return status.Id;
        }

        public async Task CreateInitialToDoStatusAsync(int projectId)
            => await this.CreateAsync(ToDoStatus, projectId);
    }
}
