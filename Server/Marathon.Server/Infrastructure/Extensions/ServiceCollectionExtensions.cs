namespace Marathon.Server.Infrastructure.Extensions
{
    using System;
    using System.IO;
    using System.Reflection;
    using System.Text;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Identity;
    using Marathon.Server.Features.Issues;
    using Marathon.Server.Features.Projects;
    using Marathon.Server.Features.Sprints;
    using Marathon.Server.Features.Teams;
    using Marathon.Server.Infrastructure.Filters;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;

    public static class ServiceCollectionExtensions
    {
        public static AppSettings GetApplicationSettings(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var applicationSettingsConfiguration = configuration.GetSection("ApplicationSettings");
            services.Configure<AppSettings>(applicationSettingsConfiguration);
            return applicationSettingsConfiguration.Get<AppSettings>();
        }

        public static IServiceCollection AddDatabase(
            this IServiceCollection services,
            IConfiguration configuration)
            => services
                .AddDbContext<MarathonDbContext>(options => options
                    .UseSqlServer(configuration.GetDefaultConnectionString()));

        public static IServiceCollection AddIdentity(this IServiceCollection services)
        {
            services
                .AddIdentity<User, IdentityRole>(options =>
                {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                })
                .AddEntityFrameworkStores<MarathonDbContext>();

            return services;
        }

        public static IServiceCollection AddJwtAuthentication(
            this IServiceCollection services,
            AppSettings appSettings)
        {
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = true,
                    };
                });

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
            => services
                .AddTransient<IIdentityService, IdentityService>()
                .AddTransient<IProjectsService, ProjectsService>()
                .AddTransient<ITeamService, TeamService>()
                .AddTransient<IIssuesService, IssuesService>()
                .AddTransient<ISprintService, SprintService>();

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            return services.AddSwaggerGen(c =>
                        {
                            c.SwaggerDoc(
                                "v1",
                                new OpenApiInfo
                                {
                                    Title = "Marathon API",
                                    Version = "v1",
                                });

                            // Bearer token authentication
                            var securityScheme = new OpenApiSecurityScheme
                            {
                                Name = "Authorization",
                                Description = "Enter JWT Bearer authorisation token",
                                In = ParameterLocation.Header,
                                Type = SecuritySchemeType.Http,
                                Scheme = "bearer", // must be lowercase!!!
                                BearerFormat = "Bearer {token}",
                                Reference = new OpenApiReference
                                {
                                    Id = JwtBearerDefaults.AuthenticationScheme,
                                    Type = ReferenceType.SecurityScheme,
                                },
                            };

                            c.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);

                            OpenApiSecurityRequirement securityRequirements = new OpenApiSecurityRequirement()
                            {
                                { securityScheme, new string[] { } },
                            };

                            c.AddSecurityRequirement(securityRequirements);

                            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                            c.IncludeXmlComments(xmlPath);
                        });
        }

        public static void AddApiControllers(this IServiceCollection services)
            => services
                .AddControllers(options => options
                    .Filters
                    .Add<ValidateModelAttribute>());
    }
}
