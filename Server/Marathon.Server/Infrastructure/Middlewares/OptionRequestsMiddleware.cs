namespace Marathon.Server.Infrastructure.Middlewares
{
    using System.Net;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Http;

    public class OptionRequestsMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            if (context.Request.Method != "OPTIONS")
            {
                await next(context);

                return;
            }

            context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { (string)context.Request.Headers["Origin"] });
            context.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "Origin, X-Requested-With, Content-Type, Accept, Authorization" });
            context.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "GET, POST, PUT, DELETE, OPTIONS, PATCH" });
            context.Response.Headers.Add("Access-Control-Allow-Credentials", new[] { "true" });
            await context.Response.WriteAsync("OK");
            context.Response.StatusCode = (int)HttpStatusCode.OK;
        }
    }
}
