namespace Marathon.Server.Infrastructure.Filters
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    using static Marathon.Server.Features.Common.Constants;

    public class HasProjectAdminAuthorizationAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (context.RouteData.Values.TryGetValue("projectId", out object value))
            {
                if (context.Controller is ControllerBase controller)
                {
                    var claimValue = value.ToString();
                    var claims = context.HttpContext.User.Claims;
                    var hasClaim = claims.Any(c => c.Type == Claims.Admin && c.Value == claimValue);
                    if (!hasClaim)
                    {
                        context.Result = new BadRequestObjectResult(new ErrorsResponseModel { Errors = new string[] { Errors.UnuthorizedUser } });
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
