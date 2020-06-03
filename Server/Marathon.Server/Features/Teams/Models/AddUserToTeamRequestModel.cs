namespace Marathon.Server.Features.Teams.Models
{
    public class AddUserToTeamRequestModel
    {
        public int TeamId { get; set; }

        public string Email { get; set; }
    }
}
