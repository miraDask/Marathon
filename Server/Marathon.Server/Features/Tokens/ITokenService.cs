namespace Marathon.Server.Features.Tokens
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public interface ITokenService
    {
        Task<bool> IsCurrentActiveToken();

        Task<string> GenerateJwtToken(string userId, string userName, string secret, IList<Claim> claims = null);

        Task DeactivateJwtToken(string userId);
    }
}
