namespace Marathon.Server.Features.Statuses
{
    using System;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Data.Common.Constants.Seeding;
    using static Marathon.Server.Features.Common.Constants;

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

        public async Task<ResultModel<bool>> DeleteAsync(int statusId)
        {
            var status = await this.GetByIdAsync(statusId);

            if (status == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidStatusId },
                };
            }

            status.IsDeleted = true;
            status.DeletedOn = DateTime.UtcNow;

            this.dbContext.Statuses.Update(status);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }


        public async Task CreateInitialToDoStatusAsync(int projectId)
            => await this.CreateAsync(ToDoStatus, projectId);

        private async Task<Status> GetByIdAsync(int statusId)
        => await this.dbContext.Statuses.FirstOrDefaultAsync(x => x.Id == statusId);
    }
}
