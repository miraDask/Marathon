namespace Marathon.Server.Data.Common
{
    using System;
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
            var users = await userManager.Users.AnyAsync();
            if (!users)
            {
                await CreateUser(userManager, FullName, UserName, Email);
            }
        }

        private static async Task<string> CreateUser(
            UserManager<User> userManager,
            string fullName,
            string username,
            string email)
        {
            var user = new User
            {
                UserName = username,
                FullName = fullName,
                Email = email,
            };

            var password = Password;
            await userManager.CreateAsync(user, password);
            return user.Id;
        }
    }
}
