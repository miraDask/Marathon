namespace Marathon.Server.Features.Teams.Models
{
    using System.Collections.Generic;

    public class TeamDetailsServiceModel
    {
        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public virtual IEnumerable<string> TeamUsers { get; set; }
    }
}
