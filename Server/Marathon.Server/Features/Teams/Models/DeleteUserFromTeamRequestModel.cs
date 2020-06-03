namespace Marathon.Server.Features.Teams.Models
{
    public class DeleteUserFromTeamRequestModel
    {
        public int TeamId { get; set; }

        public string UserId { get; set; }
    }
}
