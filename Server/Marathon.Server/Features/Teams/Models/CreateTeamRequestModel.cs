namespace Marathon.Server.Features.Teams.Models
{
    using System.ComponentModel.DataAnnotations;

    using static Marathon.Server.Data.Common.Constants.Team;

    public class CreateTeamRequestModel
    {
        [Required]
        [MinLength(TitleMinLength)]
        [MaxLength(TitleMaxLength)]
        public string Title { get; set; }

        public string ImageUrl { get; set; }
    }
}
