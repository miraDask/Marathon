namespace Marathon.Server.Features.Sprints.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using static Marathon.Server.Data.Common.Constants.Sprint;

    public class CreateSprintRequestModel
    {
        [MinLength(TitleMinLength)]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [MinLength(GoalMinLength)]
        [MaxLength(GoalMaxLength)]
        public string Goal { get; set; }

        // 1, 2, 3, 4
        public int? DurationInWeeks { get; set; }

        public DateTime StartDate { get; set; }
    }
}
