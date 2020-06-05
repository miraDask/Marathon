namespace Marathon.Server.Features.Identity
{
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class IdentityController : ControllerBase
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
        [Route(Identity.Register)]
        public async Task<ActionResult<AuthResponseModel>> Register(RegisterUserRequestModel input)
        {
            var registerResult = await this.identityService.RegisterAsync(input.UserName, input.Email, input.Password, this.appSettings.Secret);

            if (!registerResult.Success)
            {
                return this.BadRequest(
                new ErrorsResponseModel
                {
                    Errors = registerResult.Errors,
                });
            }

            return new AuthResponseModel()
            {
                Token = registerResult.Result,
            };
        }

        [HttpPost]
        [Route(Identity.Login)]
        public async Task<ActionResult<AuthResponseModel>> Login(LoginRequestModel input)
        {
            var loginResult = await this.identityService.LoginAsync(input.UserName, input.Password, this.appSettings.Secret);

            if (!loginResult.Success)
            {
                return this.Unauthorized(new ErrorsResponseModel
                {
                    Errors = loginResult.Errors,
                });
            }

            return new AuthResponseModel()
            {
                Token = loginResult.Result,
            };
        }
    }
}
