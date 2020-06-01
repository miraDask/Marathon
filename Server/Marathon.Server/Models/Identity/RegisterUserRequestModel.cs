namespace Marathon.Server.Models.Identity
{
    using System.ComponentModel.DataAnnotations;

    public class RegisterUserRequestModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
