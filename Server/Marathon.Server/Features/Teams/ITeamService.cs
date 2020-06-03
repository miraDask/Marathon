namespace Marathon.Server.Features.Teams
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Teams.Models;

    public interface ITeamService
    {
        Task<int> CreateAsync(string title, string imageUrl, int projectId);

        Task<bool> UpdateAsync(int id, string title, string imageUrl, int projectId);

        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<TeamListingServiceModel>> GetAllByProjectIdAsync(int id);

        Task<TeamDetailsServiceModel> GetDetailsAsync(int id);
    }
}
