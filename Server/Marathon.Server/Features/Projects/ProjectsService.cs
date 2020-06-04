namespace Marathon.Server.Features.Projects
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> UpdateAsync(int id, string name, string key, string imageUrl)
        {
            var project = await this.GetByIdAsync(id);

            if (project == null)
            {
                return false;
            }

            project.Name = name;
            project.ImageUrl = imageUrl;
            project.Key = key;
            project.ModifiedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var project = await this.GetByIdAsync(id);

            if (project == null)
            {
                return false;
            }

            project.IsDeleted = true;
            project.DeletedOn = DateTime.UtcNow;

            this.dbContext.Projects.Update(project);

            await this.dbContext.SaveChangesAsync();

            return true;
        }

        private async Task<Project> GetByIdAsync(int id)
        => await this.dbContext
                .Projects
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
    }
}
