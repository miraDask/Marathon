namespace Marathon.Server.Features.Projects.Models
{
    using System.Collections.Generic;

    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Features.Sprints.Models;

    public class ProjectDetailsServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Key { get; set; }

        public bool IsCreator { get; set; }

        public IEnumerable<IssueListingServiceModel> Issues { get; set; }

        public IEnumerable<SprintWithIssuesServiceModel> Sprints { get; set; }
    }
}
