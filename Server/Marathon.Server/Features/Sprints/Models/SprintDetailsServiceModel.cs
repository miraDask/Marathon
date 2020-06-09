namespace Marathon.Server.Features.Sprints.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Features.Issues.Models;

    public class SprintDetailsServiceModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Goal { get; set; }

        public int DurationInWeeks { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int? Estimate { get; set; }

        public virtual IEnumerable<IssueListingServiceModel> Issues { get; set; }
    }
}
