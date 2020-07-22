namespace Marathon.Server.Features.Issues.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Data.Enumerations;

    using static Marathon.Server.Data.Common.Constants.Issue;

    public class UpdateIssueRequestModel
    {
        [Required]
        [MinLength(TitleMinLength)]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MinLength(DescriptionMinLength)]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public int? StoryPoints { get; set; }

        public Priority Priority { get; set; }

        public Data.Enumerations.Type Type { get; set; }

        public Status Status { get; set; }

        public string AssigneeId { get; set; }

        public int StatusIndex { get; set; }

        public int BacklogIndex { get; set; }

        public int? SprintId { get; set; }

        public int? ParentIssueId { get; set; }
    }
}
