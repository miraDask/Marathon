namespace Marathon.Server.Features.Teams
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Teams.Models;
    using Marathon.Server.Infrastructure.Filters;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class TeamsController : ApiController
    {
        private readonly ITeamsService teamService;
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;

        public TeamsController(
            ITeamsService teamService,
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings)
        {
            this.teamService = teamService;
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
        }

        /// <summary>
        /// Creates new Team.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully created team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Teams.Create)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult<int>> Create(int projectId, [FromBody]CreateTeamRequestModel input)
        {
            var teamCreationResult = await this.teamService.CreateAsync(
                input.Title,
                input.ImageUrl,
                projectId);

            if (!teamCreationResult.Success)
            {
                return this.BadRequest(
                    new ErrorsResponseModel
                    {
                        Errors = teamCreationResult.Errors,
                    });
            }

            return this.Created(nameof(this.Create), teamCreationResult.Result);
        }

        /// <summary>
        /// Update current team.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <param name="teamId"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPut]
        [Route(Teams.Update)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Update(int projectId, int teamId, [FromBody]UpdateTeamRequestModel input)
        {
            var updateRequest = await this.teamService.UpdateAsync(
                teamId,
                input.Title,
                input.ImageUrl,
                projectId);

            if (!updateRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = updateRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Delete current team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Teams.Delete)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Delete(int teamId)
        {
            var deleteRequest = await this.teamService.DeleteAsync(teamId);

            if (!deleteRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = deleteRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Get all teams in current project.
        /// </summary>
        /// <param name="projectId"></param>
        /// <response code="200">Returns all teams in current project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Teams.GetAllInProject)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult<IEnumerable<TeamListingServiceModel>>> GetAll(int projectId)
        {
            var getAllRequest = await this.teamService.GetAllByProjectIdAsync(projectId);

            if (!getAllRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = getAllRequest.Errors,
                });
            }

            return this.Ok(getAllRequest.Result);
        }

        /// <summary>
        /// Remove current User from current Team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <param name="projectId"></param>
        /// <param name="input"></param>
        /// <response code="200"> Successfully removed user from team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Teams.RemoveUser)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult<int>> RemoveUserFromTeam(int projectId, int teamId, [FromBody] UserIdRequestModel input)
        {
            var removeRequest = await this.teamService.RemoveUserFromTeamAsync(input.Id, teamId, projectId);

            if (!removeRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = removeRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Get details for current team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <response code="200"> Successfully return details for current ream.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Teams.GetDetails)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult<TeamDetailsServiceModel>> Details(int teamId)
        {
            var detailsRequest = await this.teamService.GetDetailsAsync(teamId);

            if (!detailsRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = detailsRequest.Errors,
                });
            }

            return this.Ok(detailsRequest.Result);
        }
    }
}
