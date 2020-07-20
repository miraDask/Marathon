namespace Marathon.Server.Features.Projects
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Marathon.Server.Data.Enumerations;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Projects.Models;

    public interface IProjectsService
    {
        Task<int> CreateAsync(string name, string key, string imageUrl, string userId);

        Task<ResultModel<bool>> UpdateAsync(int id, string name, string key, string imageUrl);

        Task<int> GetIssuesWithoutSprintsCount(int id);

        Task<int> GetIssuesByStatusCount(int id, Status status);

        Task<ResultModel<bool>> DeleteAsync(int id);

        Task<IEnumerable<ProjectListingServiceModel>> GetAllByUserIdAsync(string id);

        Task<ResultModel<ProjectDetailsServiceModel>> GetDetailsAsync(int id);

        Task<ResultModel<bool>> AddTeamToProjectAsync(int projectId, int teamId);

        Task<ResultModel<bool>> RemoveTeamFromProjectAsync(int projectId, int teamId);

        Task<ResultModel<bool>> AddAdminToProjectAsync(string userId, int projectId);

        Task<ResultModel<bool>> RemoveAdminFromProjectAsync(string userId, int projectId);
    }
}
