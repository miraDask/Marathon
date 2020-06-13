namespace Marathon.Server.Features.Sprints.Models
{
    using System;
    using System.Collections.Generic;

    using Marathon.Server.Features.Status.Models;

    public class SprintListingServiceModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
