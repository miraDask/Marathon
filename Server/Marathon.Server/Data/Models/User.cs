﻿namespace Marathon.Server.Data.Models
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
        }

        [InverseProperty("Reporter")]
        public virtual ICollection<Issue> ReportedIssues { get; set; }

        [InverseProperty("Assignee")]
        public virtual ICollection<Issue> AssignedIssues { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}
