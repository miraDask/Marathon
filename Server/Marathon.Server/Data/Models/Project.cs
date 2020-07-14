namespace Marathon.Server.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Marathon.Server.Data.Common;

    using static Marathon.Server.Data.Common.Constants.Project;

    public class Project : BaseDeletableModel<int>
    {
        public Project()
        {
            this.Sprints = new HashSet<Sprint>();
            this.Teams = new HashSet<Team>();
            this.Issues = new HashSet<Issue>();
            this.ProjectsAdmins = new HashSet<ProjectAdmin>();
        }

        [Required]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        [MaxLength(KeyMaxLength)]
        public string Key { get; set; }

        public string CreatorId { get; set; }

        public virtual User Creator { get; set; }

        public virtual ICollection<Sprint> Sprints { get; set; }

        public virtual ICollection<Team> Teams { get; set; }

        public virtual ICollection<Issue> Issues { get; set; }

        public virtual ICollection<ProjectAdmin> ProjectsAdmins { get; set; }
    }
}
