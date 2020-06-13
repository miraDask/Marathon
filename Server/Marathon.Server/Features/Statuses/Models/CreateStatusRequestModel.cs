namespace Marathon.Server.Features.Statuses.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Marathon.Server.Data.Common.Constants.Status;

    public class CreateStatusRequestModel
    {
        [Required]
        [MinLength(NameMinLength)]
        [MaxLength(NameMaxLength)]
        public string Name { get; set; }
    }
}
