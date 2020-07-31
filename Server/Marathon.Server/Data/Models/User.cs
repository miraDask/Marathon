namespace Marathon.Server.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    using Marathon.Server.Data.Common;
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public User()
        {
            this.ReportedIssues = new HashSet<Issue>();
            this.AssignedIssues = new HashSet<Issue>();
            this.TeamsUsers = new HashSet<TeamUser>();
            this.CreatedProjects = new HashSet<Project>();
            this.ProjectsAdmins = new HashSet<ProjectAdmin>();
        }

        public string FullName { get; set; }

        public string ImageUrl { get; set; }

        [InverseProperty("Reporter")]
        public virtual ICollection<Issue> ReportedIssues { get; set; }

        [InverseProperty("Assignee")]
        public virtual ICollection<Issue> AssignedIssues { get; set; }

        public virtual ICollection<TeamUser> TeamsUsers { get; set; }

        public virtual ICollection<Project> CreatedProjects { get; set; }

        public virtual ICollection<ProjectAdmin> ProjectsAdmins { get; set; }

        [InverseProperty("Sender")]
        public virtual ICollection<Invitation> SendInvitations { get; set; }

        [InverseProperty("Recipient")]
        public virtual ICollection<Invitation> RecievedInvitations { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
