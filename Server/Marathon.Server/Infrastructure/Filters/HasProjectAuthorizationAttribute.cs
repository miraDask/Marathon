namespace Marathon.Server.Infrastructure.Filters
{
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    using static Marathon.Server.Features.Common.Constants;

    public class HasProjectAuthorizationAttribute : IAsyncActionFilter
    {
        private readonly UserManager<User> userManager;

        public HasProjectAuthorizationAttribute(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (context.ActionArguments.TryGetValue("projectId", out object value))
            {
                if (context.Controller is ControllerBase controller)
                {
                    var claimValue = value.ToString();
                    var user = await this.userManager.GetUserAsync(context.HttpContext.User);
                    var claims = await this.userManager.GetClaimsAsync(user);
                    var hasClaim = claims.Any(c => c.Type == Claims.Admin && c.Value == claimValue);
                    if (!hasClaim)
                    {
                        context.Result = new BadRequestObjectResult(Errors.UnuthorizedUser);
                    }
                    else
                    {
                        await next();
                    }
                }
            }
        }
    }
}
