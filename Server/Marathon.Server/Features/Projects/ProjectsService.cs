namespace Marathon.Server.Features.Projects
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;

    public class ProjectsService : IProjectsService
    {
        private readonly MarathonDbContext dbContext;

        public ProjectsService(MarathonDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(string name, string key, string imageUrl, string userId)
        {
            var project = new Project
            {
                Name = name,
                Key = key,
                ImageUrl = imageUrl,
                CreatorId = userId,
            };

            this.dbContext.Projects.Add(project);

            await this.dbContext.SaveChangesAsync();

            return project.Id;
        }
    }
}
