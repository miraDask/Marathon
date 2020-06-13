namespace Marathon.Server.Features.Issues.Models
{
    using Marathon.Server.Features.Status.Models;

    public class IssueListingServiceModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int? StoryPoints { get; set; }

        public StatusListingModel Status { get; set; }
    }
}
