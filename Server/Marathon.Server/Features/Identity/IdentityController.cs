namespace Marathon.Server.Features.Identity
{
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Features.Identity.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identityService;
        private readonly AppSettings appSettings;

        public IdentityController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            IIdentityService identityService)
        {
            this.userManager = userManager;
            this.identityService = identityService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterUserRequestModel input)
        {
            var user = new User()
            {
                UserName = input.UserName,
                Email = input.Email,
            };

            var result = await this.userManager.CreateAsync(user, input.Password);

            if (!result.Succeeded)
            {
                return this.BadRequest(result.Errors);
            }

            return this.Ok();
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel input)
        {
            var user = await this.userManager.FindByNameAsync(input.UserName);
            if (user == null)
            {
                return this.Unauthorized();
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, input.Password);
            if (!passwordValid)
            {
                return this.Unauthorized();
            }

            var encriptedToken = this.identityService.GenerateJwtToken(user.Id, user.UserName, this.appSettings.Secret);

            return new LoginResponseModel()
            {
                Token = encriptedToken,
            };
        }
    }
}
