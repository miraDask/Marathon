namespace Marathon.Server.Features.Teams
{
    using System.Threading.Tasks;

    public interface ITeamService
    {
        Task<int> Create(string title, string imageUrl, int projectId);
    }
}
