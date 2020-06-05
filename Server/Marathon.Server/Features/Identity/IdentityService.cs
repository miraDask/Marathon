namespace Marathon.Server.Features.Identity
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.IdentityModel.Tokens;

    using static Marathon.Server.Features.Common.Constants;

    public class IdentityService : IIdentityService
    {
        private readonly UserManager<User> userManager;

        public IdentityService(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public async Task AddClaimToUserAsync(string userId, string projectId)
        {
            var user = await this.userManager.FindByIdAsync(userId);
            await this.userManager.AddClaimAsync(user, new Claim(Claims.Admin, projectId));
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

            var token = this.GenerateJwtToken(user.Id, user.UserName, secret);

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

            var token = this.GenerateJwtToken(user.Id, username, secret);

            return new ResultModel<string>
            {
                Result = token,
                Success = true,
            };
        }

        private string GenerateJwtToken(string userId, string userName, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId),
                    new Claim(ClaimTypes.Name, userName),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
        }
    }
}
