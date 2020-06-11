namespace Marathon.Server.Features.Identity
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Tokens;

    using Microsoft.AspNetCore.Identity;

    using static Marathon.Server.Features.Common.Constants;

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<User> userManager;
        private readonly ITokenService tokenService;

        public IdentityService(UserManager<User> userManager, ITokenService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }

        public async Task<string> AddClaimToUserAsync(string userId, string claimKey, string claimValue, string secret)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            var claim = new Claim(claimKey, claimValue);
            await this.userManager.AddClaimAsync(user, claim);

            var token = await this.tokenService.GenerateJwtToken(user.Id, user.UserName, secret, new List<Claim> { claim });

            return token;
        }

        public async Task<ResultModel<string>> LoginAsync(string username, string password, string secret)
        {
            var user = await this.userManager.FindByNameAsync(username);
            if (user == null)
            {
                return new ResultModel<string>
                {
                    Errors = new string[] { Errors.InvalidUserName },
                };
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, password);
            if (!passwordValid)
            {
                return new ResultModel<string>
                {
                    Errors = new string[] { Errors.InvalidPassword },
                };
            }

            var claims = await this.userManager.GetClaimsAsync(user);
            var token = await this.tokenService.GenerateJwtToken(user.Id, user.UserName, secret, claims);

            return new ResultModel<string>
            {
                Result = token,
                Success = true,
            };
        }

        public async Task<ResultModel<string>> RegisterAsync(string username, string email, string password, string secret)
        {
            var existingUser = await this.userManager.FindByEmailAsync(email);

            if (existingUser != null)
            {
                return new ResultModel<string>
                {
                    Errors = new string[] { string.Format(Errors.AlreadyRegisteredUser, email) },
                };
            }

            var user = new User()
            {
                UserName = username,
                Email = email,
            };

            var registerAtempt = await this.userManager.CreateAsync(user, password);

            if (!registerAtempt.Succeeded)
            {
                return new ResultModel<string>
                {
                    Errors = registerAtempt.Errors.Select(x => x.Description),
                };
            }

            var token = await this.tokenService.GenerateJwtToken(user.Id, username, secret);

            return new ResultModel<string>
            {
                Result = token,
                Success = true,
            };
        }

        public async Task RemoveClaimFromUserAsync(string userId, string claimType, string claimValue)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            var claims = await this.userManager.GetClaimsAsync(user);
            var claim = claims.Where(x => x.Type == claimType && x.Value == claimValue).FirstOrDefault();
            await this.userManager.RemoveClaimAsync(user, claim);

            await this.tokenService.DeactivateJwtToken(user.Id);
        }
    }
}
