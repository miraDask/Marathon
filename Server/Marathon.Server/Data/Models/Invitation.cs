namespace Marathon.Server.Data.Models
{
    using Marathon.Server.Data.Common;

    public class Invitation : BaseDeletableModel<int>
    {
        public string RecipientId { get; set; }

        public virtual User Recipient { get; set; }

        public int ProjectId { get; set; }

        public virtual Project Project { get; set; }

        public int TeamId { get; set; }

        public Team Team { get; set; }

        public bool Accepted { get; set; }
    }
}
