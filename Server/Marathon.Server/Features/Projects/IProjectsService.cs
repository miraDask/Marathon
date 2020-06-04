namespace Marathon.Server.Features.Projects
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Projects.Models;

    public interface IProjectsService
    {
        Task<int> CreateAsync(string name, string key, string imageUrl, string userId);

        Task<bool> UpdateAsync(int id, string name, string key, string imageUrl);

        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<ProjectListingServiceModel>> GetAllByUserIdAsync(string id);

        Task<ProjectDetailsServiceModel> GetDetailsAsync(int id);

        Task<bool> AddTeamToProjectAsync(int projectId, int teamId);

        Task<bool> RemoveTeamFromProjectAsync(int projectId, int teamId);
    }
}
