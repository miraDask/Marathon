namespace Marathon.Server.Features.Projects
{
    using System.Threading.Tasks;

    public interface IProjectsService
    {
        Task<int> CreateAsync(string name, string key, string imageUrl, string userId);
    }
}
