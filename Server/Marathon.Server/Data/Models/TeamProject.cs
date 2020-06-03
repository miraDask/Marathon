namespace Marathon.Server.Data.Models
{
    public class TeamProject
    {
        public int TeamId { get; set; }

        public virtual Team Team { get; set; }

        public int ProjectId { get; set; }

        public virtual Project Project { get; set; }
    }
}