namespace Marathon.Server.Data
{
    using Marathon.Server.Models;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    public class MarathonDbContext : IdentityDbContext<User>
    {
        public MarathonDbContext(DbContextOptions<MarathonDbContext> options)
            : base(options)
        {
        }
    }
}
