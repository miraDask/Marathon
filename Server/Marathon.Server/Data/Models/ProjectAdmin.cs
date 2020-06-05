namespace Marathon.Server.Data.Models
{
    public class ProjectAdmin
    {
        public string UserId { get; set; }

        public virtual User User { get; set; }

        public int ProjectId { get; set; }

        public virtual Project Project { get; set; }
    }
}
