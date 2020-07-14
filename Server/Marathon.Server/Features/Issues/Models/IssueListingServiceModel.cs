namespace Marathon.Server.Features.Issues.Models
{
    using Marathon.Server.Data.Enumerations;

    public class IssueListingServiceModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int? StoryPoints { get; set; }

        public Status Status { get; set; }
    }
}
