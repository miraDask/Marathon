namespace Marathon.Server.Data.Common
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using static Marathon.Server.Data.Common.Constants.Seeding;

    public class DataSeeder : ISeeder
    {
        public async Task SeedAsync(MarathonDbContext dbContext, IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            // creating first user;
            await CreateUser(userManager, UserName, Email);

            // creating initial issue statuses;
            await CreateStatus(ToDoStatus, dbContext);
            await CreateStatus(InProgressStatus, dbContext);
            await CreateStatus(DoneStatus, dbContext);
        }

        private static async Task<string> CreateUser(
            UserManager<User> userManager,
            string username,
            string email)
        {
            var user = new User
            {
                UserName = username,
                Email = email,
            };

            var password = Password;

            if (!userManager.Users.Any())
            {
                await userManager.CreateAsync(user, password);
            }

            return user.Id;
        }

        private static async Task CreateStatus(string name, MarathonDbContext dbContext)
        {
            var status = new Status
            {
                Name = name,
            };

            var statusCollection = await dbContext.Statuses.AnyAsync();

            if (!statusCollection)
            {
                await dbContext.Statuses.AddAsync(status);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
