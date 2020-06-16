namespace Marathon.Server.Features.Statuses
{
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Statuses.Models;

    public interface IStatusesService
    {
        Task<int> CreateAsync(string name, int projectId);

        Task<ResultModel<bool>> DeleteAsync(int statusId);

        Task CreateInitialToDoStatusAsync(int projectId);

        Task<ResultModel<AllStatusesResponseModel>> GetAllForSprint(int sprintId);

        Task<ResultModel<AllStatusesResponseModel>> GetAllForProject(int projectId);
    }
}
