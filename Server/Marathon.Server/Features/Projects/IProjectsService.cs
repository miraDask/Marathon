namespace Marathon.Server.Features.Projects
{
    using System.Threading.Tasks;

    public interface IProjectsService
    {
        Task<int> CreateAsync(string name, string key, string imageUrl, string userId);

        Task<bool> UpdateAsync(int id, string name, string key, string imageUrl);

        Task<bool> DeleteAsync(int id);
    }
}
