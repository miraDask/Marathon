namespace Marathon.Server.Features.Identity
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;

    public interface IIdentityService
    {
        Task<ResultModel<AuthResponseModel>> RegisterAsync(string fullName, string userName, string email, string password, string secret);

        Task<ResultModel<AuthResponseModel>> LoginAsync(string email, string password, string secret);

        Task LoguotAsync(string token);

        Task UpdateUserAsync(string userId, string fullName, string userName, string imageUrl);

        Task<UserListingServerModel> GetAssignee(string id);

        Task<UserDetailsServiceModel> GetUser(string id);

        Task<string[]> GetAllUsersIdsConnectedToProjectByIdAsync(int projectId);

        Task<string> AddClaimToUserAsync(string userId, string claimKey, string claimValue, string secret);

        Task AddClaimToUserAsync(string userId, string claimKey, string claimValue);

        Task RemoveClaimFromUserAsync(string userId, string claimType, string claimValue);

        Task<string> GetUsersRefreshedToken(User user, string secret);
    }
}
