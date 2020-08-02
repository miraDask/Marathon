namespace Marathon.Server.Features.Teams
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Teams.Models;

    public interface ITeamsService
    {
        Task<ResultModel<int>> CreateAsync(string title, string imageUrl, int projectId);

        Task<ResultModel<bool>> UpdateAsync(int id, string title, string imageUrl, int projectId);

        Task<ResultModel<bool>> DeleteAsync(int id);

        Task<ResultModel<IEnumerable<TeamListingServiceModel>>> GetAllByProjectIdAsync(int id);

        Task<ResultModel<TeamDetailsServiceModel>> GetDetailsAsync(int id);

        Task<ResultModel<bool>> RemoveUserFromTeamAsync(string email, int teamId, int projectId);
    }
}
