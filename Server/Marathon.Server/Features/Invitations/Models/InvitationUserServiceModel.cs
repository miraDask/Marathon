namespace Marathon.Server.Features.Invitations.Models
{
    public class InvitationUserServiceModel
    {
        public string RecipientEmail { get; set; }

        public bool Declined { get; set; }
    }
}
