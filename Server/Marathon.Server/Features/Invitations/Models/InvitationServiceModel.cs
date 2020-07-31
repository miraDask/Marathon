namespace Marathon.Server.Features.Invitations.Models
{
    public class InvitationServiceModel
    {
        public int Id { get; set; }

        public string SenderFullName { get; set; }

        public string ProjectName { get; set; }

        public string TeamName { get; set; }
    }
}
