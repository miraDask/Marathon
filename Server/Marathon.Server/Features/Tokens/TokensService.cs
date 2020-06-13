namespace Marathon.Server.Features.Tokens
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Cache;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Primitives;
    using Microsoft.IdentityModel.Tokens;

    using static Marathon.Server.Features.Common.Constants;

    public class TokensService : ITokensService
    {
        private readonly ICacheService cacheService;
        private readonly IHttpContextAccessor httpContextAccessor;

        public TokensService(ICacheService cacheService, IHttpContextAccessor httpContextAccessor)
        {
            this.cacheService = cacheService;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> GenerateJwtToken(string userId, string userName, string secret, IList<Claim> claims = null)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            var identityClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, userName),
            };

            if (claims != null)
            {
                identityClaims.AddRange(claims);
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(identityClaims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            await this.cacheService.SetAsync(userId, encryptedToken);
            return encryptedToken;
        }

        public async Task DeactivateJwtToken(string userId)
        {
            var token = await this.cacheService.GetAsync(userId);

            await this.cacheService.SetAsync(this.GetKey(token), " ");
        }

        public async Task<bool> IsCurrentActiveToken()
            => await this.IsActiveAsync(this.GetCurrentAsync());

        private async Task<bool> IsActiveAsync(string token)
            => await this.cacheService.GetAsync(this.GetKey(token)) == null;

        private string GetCurrentAsync()
        {
            var authorizationHeader = this.httpContextAccessor
                .HttpContext.Request.Headers["authorization"];

            return authorizationHeader == StringValues.Empty
                ? string.Empty
                : authorizationHeader.Single().Split(" ").Last();
        }

        private string GetKey(string token) => string.Format(DeactivatedTokenString, token);
    }
}
