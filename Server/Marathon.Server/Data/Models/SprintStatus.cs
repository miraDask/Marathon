namespace Marathon.Server.Data.Models
{
    public class SprintStatus
    {
        public int SprintId { get; set; }

        public virtual Sprint Sprint { get; set; }

        public int StatusId { get; set; }

        public virtual Status Status { get; set; }
    }
}
