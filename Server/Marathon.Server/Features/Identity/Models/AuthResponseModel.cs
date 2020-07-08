namespace Marathon.Server.Features.Identity.Models
{
    public class AuthResponseModel
    {
        public string Token { get; set; }

        public string FullName { get; set; }

        public bool HasProjects { get; set; }
    }
}
