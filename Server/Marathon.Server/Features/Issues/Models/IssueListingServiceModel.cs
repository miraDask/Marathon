namespace Marathon.Server.Features.Issues.Models
{
    public class IssueListingServiceModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public int StatusId { get; set; }

        public string StatusName { get; set; }
    }
}
