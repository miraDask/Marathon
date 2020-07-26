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

        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [MaxLength(GoalMaxLength)]
        public string Goal { get; set; }

        public int ProjectId { get; set; }

        public virtual Project Project { get; set; }

        public int? DurationInWeeks { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool Active { get; set; }

        public bool Archived { get; set; }

        public virtual ICollection<Issue> Issues { get; set; }
    }
}
