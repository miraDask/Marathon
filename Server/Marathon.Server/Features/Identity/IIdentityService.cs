namespace Marathon.Server.Features.Identity
{
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;

    public interface IIdentityService
    {
        Task<ResultModel<string>> RegisterAsync(string username, string email, string password, string secret);

        Task<ResultModel<string>> LoginAsync(string username, string password, string secret);

        Task<string> AddClaimToUserAsync(string userId, string claimKey, string claimValue, string secret);

        Task RemoveClaimFromUserAsync(string userId, string claimType, string claimValue);
    }
}
