namespace Marathon.Server.Features.Invitations.Models
{
    public class InvitationUserServiceModel
    {
        public int Id { get; set; }

        public string RecipientEmail { get; set; }

        public bool Declined { get; set; }
    }
}
