namespace Marathon.Server.Features.Projects.Models
{
    public class AddTeamToProjectRequestModel
    {
        public int ProjectId { get; set; }

        public int TeamId { get; set; }
    }
}
