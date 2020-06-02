namespace Marathon.Server.Data.Common
{
    using System;
    using System.Threading.Tasks;

    public interface ISeeder
    {
        Task SeedAsync(MarathonDbContext dbContext, IServiceProvider serviceProvider);
    }
}
