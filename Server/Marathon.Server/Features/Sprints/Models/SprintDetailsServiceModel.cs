namespace Marathon.Server.Features.Sprints.Models
{
    using System;
    using System.Collections.Generic;

    using Marathon.Server.Features.Issues.Models;

    public class SprintDetailsServiceModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int RemainingDays { get; set; }

        public int? Estimate { get; set; }

        public virtual SprintStatusesListingModel TodoIssues { get; set; }

        public virtual SprintStatusesListingModel DevelopmentIssues { get; set; }

        public virtual SprintStatusesListingModel TestingIssues { get; set; }

        public virtual SprintStatusesListingModel DoneIssues { get; set; }
    }
}
