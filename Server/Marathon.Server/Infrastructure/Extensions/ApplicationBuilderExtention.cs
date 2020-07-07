namespace Marathon.Server.Infrastructure.Extentions
{
    using Marathon.Server.Data;
    using Marathon.Server.Data.Common;
    using Marathon.Server.Infrastructure.Middlewares;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public static class ApplicationBuilderExtention
    {
        public static IApplicationBuilder UseSwaggerUI(this IApplicationBuilder app)
            => app
                .UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Marathon API");
                    options.RoutePrefix = string.Empty;
                });

        public static IApplicationBuilder UseTokenCheckMiddleware(this IApplicationBuilder app)
            => app.UseWhen(
                httpContext => !httpContext.Request.Path.StartsWithSegments('/' + Identity.IdentityRoute),
                subApp => subApp.UseMiddleware<TokenManagerMiddleware>());

        public static IApplicationBuilder UseOptionsMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<OptionRequestsMiddleware>();
        }

        public static void ApplyMigrations(this IApplicationBuilder app)
        {
            using var services = app.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<MarathonDbContext>();
            dbContext.Database.Migrate();
            new DbContextSeeder().SeedAsync(dbContext, services.ServiceProvider).GetAwaiter().GetResult();
        }
    }
}
