namespace Marathon.Server.Features.Teams
{
    using System.Threading.Tasks;

    using Marathon.Server.Features.Teams.Models;
    using Marathon.Server.Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    //[Authorize]
    public class TeamsController : ApiController
    {
        private readonly ITeamService teamService;

        public TeamsController(ITeamService teamService)
        {
            this.teamService = teamService;
        }

        [HttpPost]
        //[Route(nameof(Create))]
        public async Task<ActionResult<int>> Create(CreateTeamRequestModel input)
        {
            var userId = this.User.GetId();

            var id = await this.teamService.Create(
                input.Title,
                input.ImageUrl,
                input.ProjectId);

            return this.Created(nameof(this.Create), id);
        }
    }
}
