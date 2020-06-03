namespace Marathon.Server.Features.Teams.Models
{
    public class UpdateTeamRequestModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public int ProjectId { get; set; }
    }
}
