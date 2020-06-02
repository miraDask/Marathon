namespace Marathon.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Data.Common;
    using Marathon.Server.Data.Enumerations;

    using static Marathon.Server.Data.Common.Constants.Issue;

    public class Issue : BaseDeletableModel<int>
    {
        public Issue()
        {
            this.ChildIssues = new HashSet<Issue>();
        }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public int? StoryPoins { get; set; }

        public Priority Priority { get; set; }

        public Type Type { get; set; }

        public string ReporterId { get; set; }

        public virtual User Reporter { get; set; }

        public string AssigneeId { get; set; }

        public User Assignee { get; set; }

        public int StatusId { get; set; }

        public virtual Status Satus { get; set; }

        public int? SprintId { get; set; }

        public virtual Sprint Sprint { get; set; }

        public int? ParentIssueId { get; set; }

        public virtual Issue ParentIssue { get; set; }

        public ICollection<Issue> ChildIssues { get; set; }
    }
}
