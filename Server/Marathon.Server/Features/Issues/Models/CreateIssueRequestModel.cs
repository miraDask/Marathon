namespace Marathon.Server.Features.Issues.Models
{
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Data.Enumerations;

    using static Marathon.Server.Data.Common.Constants.Issue;

    public class CreateIssueRequestModel
    {
        [Required]
        [MinLength(TitleMinLength)]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MinLength(DescriptionMinLength)]
        [MaxLength(DescriptionMaxLength)]
        public string Description { get; set; }

        public int? StoryPoins { get; set; }

        public Priority Priority { get; set; }

        public Type Type { get; set; }

        public int StatusId { get; set; }

        public bool IsAssignedToCreator { get; set; }

        public int? SprintId { get; set; }

        public int? ParentIssueId { get; set; }
    }
}
