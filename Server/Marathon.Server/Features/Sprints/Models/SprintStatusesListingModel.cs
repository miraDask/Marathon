namespace Marathon.Server.Features.Sprints.Models
{
    using System.Collections.Generic;

    using Marathon.Server.Features.Issues.Models;

    public class SprintStatusesListingModel
    {
        public string Title { get; set; }

        public virtual IEnumerable<IssueListingServiceModel> Issues { get; set; }
    }
}
