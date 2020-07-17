namespace Marathon.Server.Features.Sprints.Models
{
    using System;
    using System.Collections.Generic;

    using Marathon.Server.Features.Issues.Models;

    public class SprintWithIssuesServiceModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Estimate { get; set; }

        public virtual IEnumerable<IssueListingServiceModel> Issues { get; set; }
    }
}
