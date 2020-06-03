namespace Marathon.Server.Features.Teams.Models
{
    using System.ComponentModel.DataAnnotations;

    public class CreateTeamRequestModel
    {
        [Required]
        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public int ProjectId { get; set; }
    }
}
