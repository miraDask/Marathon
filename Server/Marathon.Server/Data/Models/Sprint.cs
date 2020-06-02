namespace Marathon.Server.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Data.Common;

    using static Marathon.Server.Data.Common.Constants.Sprint;

    public class Sprint : BaseDeletableModel<int>
    {
        public Sprint()
        {
            this.Issues = new HashSet<Issue>();
        }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(GoalMaxLength)]
        public string Goal { get; set; }

        // weeks: 1, 2, 3, 4
        public TimeSpan Duration { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public ICollection<Issue> Issues { get; set; }
    }
}
