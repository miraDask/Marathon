namespace Marathon.Server.Features.Sprints.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Features.Issues.Models;

    using static Marathon.Server.Data.Common.Constants.Sprint;

    public class SprintDetailsServiceModel
    {
        public int Id { get; set; }

        [Required]
        [MinLength(TitleMinLength)]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MinLength(GoalMinLength)]
        [MaxLength(GoalMaxLength)]
        public string Goal { get; set; }

        public int DurationInWeeks { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public virtual IEnumerable<IssueListingServiceModel> Issues { get; set; }
    }
}
