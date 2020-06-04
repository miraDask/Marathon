namespace Marathon.Server.Features.Teams.Models
{
    using System.Collections.Generic;

    using Marathon.Server.Features.Identity.Models;

    public class TeamDetailsServiceModel
    {
        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public IEnumerable<UserListingServerModel> TeamUsers { get; set; }
    }
}
