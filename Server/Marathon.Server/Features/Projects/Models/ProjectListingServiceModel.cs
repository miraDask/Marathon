namespace Marathon.Server.Features.Projects.Models
{
    public class ProjectListingServiceModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Key { get; set; }

        public bool IsCurrentUserCreator { get; set; }
    }
}
