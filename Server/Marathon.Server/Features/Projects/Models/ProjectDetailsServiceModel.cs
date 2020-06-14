﻿namespace Marathon.Server.Features.Projects.Models
{
    using System.Collections.Generic;

    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Status.Models;
    using Marathon.Server.Features.Teams.Models;

    public class ProjectDetailsServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Key { get; set; }

        public UserListingServerModel Creator { get; set; }

        public IEnumerable<TeamListingServiceModel> Teams { get; set; }

        public IEnumerable<StatusListingModel> Statuses { get; set; }
    }
}
