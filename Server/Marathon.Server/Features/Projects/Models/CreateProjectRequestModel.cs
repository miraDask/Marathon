namespace Marathon.Server.Features.Projects.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Marathon.Server.Data.Common.Constants.Project;

    public class CreateProjectRequestModel
    {
        [Required]
        [MinLength(NameMinLength)]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        [MinLength(KeyMinLength)]
        [MaxLength(KeyMaxLength)]
        public string Key { get; set; }
    }
}
