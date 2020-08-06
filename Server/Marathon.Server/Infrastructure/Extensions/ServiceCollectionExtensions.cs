namespace Marathon.Server.Infrastructure.Extensions
{
    using System;
    using System.IO;
    using System.Reflection;
    using System.Text;
    using System.Threading.Tasks;
    using EasyCaching.Core.Configurations;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Cache;
    using Marathon.Server.Features.Identity;
    using Marathon.Server.Features.Invitations;
    using Marathon.Server.Features.Issues;
    using Marathon.Server.Features.Projects;
    using Marathon.Server.Features.Sprints;
    using Marathon.Server.Features.Teams;
    using Marathon.Server.Features.Tokens;
    using Marathon.Server.Infrastructure.Filters;
    using Marathon.Server.Infrastructure.Middlewares;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;

    using static Marathon.Server.Features.Common.Constants;

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

        public static IServiceCollection AddSignalRWithOptions(this IServiceCollection services)
        {
            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });

            return services;
        }

        public static IServiceCollection AddCorsWithOptions(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
            {
                builder
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .SetIsOriginAllowed((host) => true);
        }));

            return services;
        }

        public static IServiceCollection AddRedisEasyCaching(this IServiceCollection services)
        {
            services.AddEasyCaching(options =>
            {
                // use redis cache
                options.UseRedis(
                    redisConfig =>
                {
                    // Setup Endpoint
                    redisConfig.DBConfig.Endpoints.Add(new ServerEndPoint(Redis.Connection, Redis.Port));

                    // Setup password if applicable
                    // if (!string.IsNullOrEmpty(serverPassword))
                    // {
                    //    redisConfig.DBConfig.Password = serverPassword;
                    // }

                    // Allow admin operations
                    redisConfig.DBConfig.AllowAdmin = true;
                },
                    Redis.Channel);
            });

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
                    x.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];

                            // If the request is for our hub...
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                path.StartsWithSegments("/updatesHub"))
                            {
                                // Read the token out of the query string
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        },
                    };
                });

            return services;
        }

        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
            => services
                .AddTransient<IIdentityService, IdentityService>()
                .AddTransient<IProjectsService, ProjectsService>()
                .AddTransient<ITeamsService, TeamsService>()
                .AddTransient<IIssuesService, IssuesService>()
                .AddTransient<ISprintsService, SprinstService>()
                .AddTransient<ICacheService, CacheService>()
                .AddTransient<ITokensService, TokensService>()
                .AddTransient<IInvitationsService, InvitationsService>()
                .AddTransient<OptionRequestsMiddleware>()
                .AddTransient<TokenManagerMiddleware>();

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
