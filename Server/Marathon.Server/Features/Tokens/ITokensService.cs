namespace Marathon.Server.Features.Tokens
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public interface ITokensService
    {
        Task<bool> IsCurrentActiveToken();

        Task<string> GenerateJwtToken(string userId, string email, string secret, IList<Claim> claims = null);

        Task DeactivateJwtToken(string userId, string token = null);
    }
}
