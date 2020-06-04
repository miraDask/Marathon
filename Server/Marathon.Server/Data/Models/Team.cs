namespace Marathon.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Data.Common;

    using static Marathon.Server.Data.Common.Constants.Team;

    public class Team : BaseDeletableModel<int>
    {
        public Team()
        {
            this.TeamsUsers = new HashSet<TeamUser>();
        }

        [Required]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        public string ImageUrl { get; set; }

        public int? ProjectId { get; set; }

        public virtual Project Project { get; set; }

        public virtual ICollection<TeamUser> TeamsUsers { get; set; }
    }
}
