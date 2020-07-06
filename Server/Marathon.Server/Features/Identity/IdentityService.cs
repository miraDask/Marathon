namespace Marathon.Server.Features.Identity
{
    using System;
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
        private readonly ITokensService tokenService;

        public IdentityService(UserManager<User> userManager, ITokensService tokenService)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
        }

        public async Task<string> AddClaimToUserAsync(string userId, string claimKey, string claimValue, string secret)
        {
            var user = await this.AddNewClaimToUserAsync(userId, claimKey, claimValue);

            var claims = await this.userManager.GetClaimsAsync(user);
            var token = await this.tokenService.GenerateJwtToken(user.Id, user.UserName, secret, claims);

            await this.tokenService.DeactivateJwtToken(user.Id);
            return token;
        }

        public async Task AddClaimToUserAsync(string userId, string claimKey, string claimValue)
        {
            var user = await this.AddNewClaimToUserAsync(userId, claimKey, claimValue);
            await this.tokenService.DeactivateJwtToken(user.Id);
        }

        public async Task<ResultModel<string>> LoginAsync(string email, string password, string secret)
        {
            var user = await this.userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ResultModel<string>
                {
                    Errors = new string[] { Errors.InvalidLoginAttempt },
                };
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, password);
            if (!passwordValid)
            {
                return new ResultModel<string>
                {
                    Errors = new string[] { Errors.InvalidLoginAttempt },
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

        public async Task LoguotAsync(string token)
        {
            await this.tokenService.DeactivateJwtToken(null, token);
        }

        public async Task<ResultModel<string>> RegisterAsync(
            string fullName,
            string userName,
            string email,
            string password,
            string secret)
        {
            var existingEmail = await this.userManager.FindByEmailAsync(email);

            if (existingEmail != null)
            {
                return new ResultModel<string>
                {
                    Errors = new string[] { string.Format(Errors.AlreadyRegisteredUser, email) },
                };
            }

            var user = new User()
            {
                UserName = userName,
                FullName = fullName,
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

            var token = await this.tokenService.GenerateJwtToken(user.Id, email, secret);

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

        private async Task<User> AddNewClaimToUserAsync(string userId, string claimKey, string claimValue)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            var claim = new Claim(claimKey, claimValue);
            await this.userManager.AddClaimAsync(user, claim);

            return user;
        }
    }
}
