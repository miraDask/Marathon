namespace Marathon.Server.Infrastructure.Middlewares
{
    using System.Net;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Tokens;
    using Microsoft.AspNetCore.Http;

    public class TokenManagerMiddleware : IMiddleware
    {
        private readonly ITokensService tokenService;

        public TokenManagerMiddleware(ITokensService tokenService)
        {
            this.tokenService = tokenService;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (await this.tokenService.IsCurrentActiveToken())
            {
                await next(context);

                return;
            }

            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        }
    }
}
