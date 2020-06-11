namespace Marathon.Server.Features.Cache
{
    using System.Threading.Tasks;

    public interface ICacheService
    {
        Task SetAsync(string key, string value);

        Task<string> GetAsync(string key);
    }
}
