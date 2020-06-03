namespace Marathon.Server.Features.Teams
{
    using System.Threading.Tasks;

    public interface ITeamService
    {
        Task<int> CreateAsync(string title, string imageUrl, int projectId);

        Task<bool> UpdateAsync(int id, string title, string imageUrl, int projectId);
    }
}
