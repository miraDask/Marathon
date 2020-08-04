namespace Marathon.Server.Features.Identity
{
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Tokens;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants;

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<User> userManager;
        private readonly ITokensService tokenService;
        private readonly MarathonDbContext dbContext;

        public IdentityService(UserManager<User> userManager, ITokensService tokenService, MarathonDbContext dbContext)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.dbContext = dbContext;
        }

        public async Task<string> AddClaimToUserAsync(string userId, string claimKey, string claimValue, string secret)
        {
            var user = await this.AddNewClaimToUserAsync(userId, claimKey, claimValue);

            var claims = await this.userManager.GetClaimsAsync(user);
            await this.tokenService.DeactivateJwtToken(user.Id);

            var token = await this.tokenService.GenerateJwtToken(user.Id, user.UserName, secret, claims);
            return token;
        }

        public async Task AddClaimToUserAsync(string userId, string claimKey, string claimValue)
        {
            var user = await this.AddNewClaimToUserAsync(userId, claimKey, claimValue);
            await this.tokenService.DeactivateJwtToken(user.Id);
        }

        public async Task<ResultModel<AuthResponseModel>> LoginAsync(string email, string password, string secret)
        {
            var user = await this.userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new ResultModel<AuthResponseModel>
                {
                    Errors = new string[] { Errors.InvalidLoginAttempt },
                };
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, password);
            if (!passwordValid)
            {
                return new ResultModel<AuthResponseModel>
                {
                    Errors = new string[] { Errors.InvalidLoginAttempt },
                };
            }

            var claims = await this.userManager.GetClaimsAsync(user);
            var token = await this.tokenService.GenerateJwtToken(user.Id, email, secret, claims);
            var userProjects = await this.dbContext.Users.
                FirstOrDefaultAsync(x => x.Id == user.Id);

            return new ResultModel<AuthResponseModel>
            {
                Result = new AuthResponseModel
                {
                    Token = token,
                    FullName = user.FullName,
                    ImageUrl = user.ImageUrl,
                },
                Success = true,
            };
        }

        public async Task LoguotAsync(string token)
        {
            await this.tokenService.DeactivateJwtToken(null, token);
        }

        public async Task<ResultModel<AuthResponseModel>> RegisterAsync(
            string fullName,
            string userName,
            string email,
            string password,
            string secret)
        {
            var existingEmail = await this.userManager.FindByEmailAsync(email);

            if (existingEmail != null)
            {
                return new ResultModel<AuthResponseModel>
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
                return new ResultModel<AuthResponseModel>
                {
                    Errors = registerAtempt.Errors.Select(x => x.Description),
                };
            }

            var token = await this.tokenService.GenerateJwtToken(user.Id, email, secret);

            return new ResultModel<AuthResponseModel>
            {
                Result = new AuthResponseModel
                {
                    Token = token,
                    FullName = fullName,
                    ImageUrl = string.Empty,
                },
                Success = true,
            };
        }

        public async Task<UserListingServerModel> GetAssignee(string id)
        {
            return await this.dbContext.Users.Where(x => x.Id == id).Select(x => new UserListingServerModel
            {
                Id = x.Id,
                FullName = x.FullName,
                ImageUrl = x.ImageUrl,
            })
            .FirstOrDefaultAsync();
        }

        public async Task RemoveClaimFromUserAsync(string userId, string claimType, string claimValue)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            var claims = await this.userManager.GetClaimsAsync(user);
            var claim = claims.Where(x => x.Type == claimType && x.Value == claimValue).FirstOrDefault();
            await this.userManager.RemoveClaimAsync(user, claim);

            await this.tokenService.DeactivateJwtToken(user.Id);
        }

        public async Task UpdateUserAsync(string userId, string fullName, string userName, string imageUrl)
        {
            var user = await this.userManager.FindByIdAsync(userId);

            if (fullName != string.Empty && fullName != user.FullName)
            {
                user.FullName = fullName;
            }

            if (userName != string.Empty && userName != user.UserName)
            {
                user.UserName = userName;
            }

            if (imageUrl != string.Empty && imageUrl != user.ImageUrl)
            {
                user.ImageUrl = imageUrl;
            }

            this.dbContext.Update(user);
            await this.dbContext.SaveChangesAsync();
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
