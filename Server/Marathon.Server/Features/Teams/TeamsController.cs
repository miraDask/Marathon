namespace Marathon.Server.Features.Teams
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Teams.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamService teamService;
        private readonly UserManager<User> userManager;

        public TeamsController(ITeamService teamService, UserManager<User> userManager)
        {
            this.teamService = teamService;
            this.userManager = userManager;
        }

        /// <summary>
        /// Creates new Team.
        /// </summary>
        /// <param name="input"></param>
        /// <response code="201"> Successfully created team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Teams.Create)]
        public async Task<ActionResult<int>> Create(CreateTeamRequestModel input)
        {
            var teamCreationResult = await this.teamService.CreateAsync(
                input.Title,
                input.ImageUrl,
                input.ProjectId);

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
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPut]
        [Route(Teams.Update)]
        public async Task<ActionResult> Update(UpdateTeamRequestModel input)
        {
            var updateRequest = await this.teamService.UpdateAsync(
                input.Id,
                input.Title,
                input.ImageUrl,
                input.ProjectId);

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
        /// Assign current User to current Team.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="teamId"></param>
        /// <response code="201"> Successfully assigned user to team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Teams.AddUser)]
        public async Task<ActionResult<int>> AssignUserToTeam(int teamId, AddUserToTeamRequestModel input)
        {
            var assignUserRequest = await this.teamService.AddUserToTeamAsync(input.Email, teamId);

            if (!assignUserRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = assignUserRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Remove current User from current Team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <param name="userId"></param>
        /// <response code="201"> Successfully removed user from team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Teams.RemoveUser)]
        public async Task<ActionResult<int>> RemoveUserFromTeam(int teamId, string userId)
        {
            var removeRequest = await this.teamService.RemoveUserFromTeamAsync(userId, teamId);

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
        /// <response code="201"> Successfully return details for current ream.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Teams.GetDetails)]
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
