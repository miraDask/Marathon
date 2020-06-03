namespace Marathon.Server.Data.Models
{
    public class TeamUser
    {
        public int TeamId { get; set; }

        public virtual Team Team { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
