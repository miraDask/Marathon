namespace Marathon.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Data.Common;

    using static Marathon.Server.Data.Common.Constants.Status;

    public class Status : BaseDeletableModel<int>
    {
        public Status()
        {
            this.Issues = new HashSet<Issue>();
            this.SprintsStatuses = new HashSet<SprintStatus>();
        }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        public virtual ICollection<Issue> Issues { get; set; }

        public virtual ICollection<SprintStatus> SprintsStatuses { get; set; }
    }
}
