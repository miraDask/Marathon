namespace Marathon.Server.Features.Teams.Models
{
    using System.ComponentModel.DataAnnotations;

    public class AddUserToTeamRequestModel
    {
        [Required]
        public string Email { get; set; }
    }
}
