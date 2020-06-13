namespace Marathon.Server.Features.Statuses
{
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;

    public interface IStatusesService
    {
        Task<int> CreateAsync(string name, int projectId);

        Task CreateInitialToDoStatusAsync(int projectId);
    }
}
