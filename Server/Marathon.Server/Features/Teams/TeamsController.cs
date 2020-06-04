namespace Marathon.Server.Features.Teams
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Teams.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.WebConstants;

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class TeamsController : ApiController
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
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Create(CreateTeamRequestModel input)
        {
            var id = await this.teamService.CreateAsync(
                input.Title,
                input.ImageUrl,
                input.ProjectId);

            return this.Created(nameof(this.Create), id);
        }

        /// <summary>
        /// Update current team.
        /// </summary>
        /// <param name="input"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPut]
        public async Task<ActionResult> Update(UpdateTeamRequestModel input)
        {
            var updated = await this.teamService.UpdateAsync(
                input.Id,
                input.Title,
                input.ImageUrl,
                input.ProjectId);

            if (!updated)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        /// <summary>
        /// Delete current team.
        /// </summary>
        /// <param name="id"></param>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(TeamId)]
        public async Task<ActionResult> Delete(int id)
        {
            var deleted = await this.teamService.DeleteAsync(id);

            if (!deleted)
            {
                return this.BadRequest();
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
        [Route(ProjectId)]
        public async Task<IEnumerable<TeamListingServiceModel>> GetAll(int projectId)
        {
            return await this.teamService.GetAllByProjectIdAsync(projectId);
        }

        /// <summary>
        /// Assign current User to current Team.
        /// </summary>
        /// <param name="input"></param>
        /// <response code="201"> Successfully assigned user to team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(TeamId)]
        public async Task<ActionResult<int>> AssignUserToTeam(AddUserToTeamRequestModel input)
        {
            var user = await this.userManager.FindByEmailAsync(input.Email);

            if (user == null)
            {
                return this.BadRequest();
            }

            var success = await this.teamService.AddUserToTeamAsync(user, input.TeamId);

            if (!success)
            {
                return this.BadRequest();
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
        [Route(TeamIdUserId)]
        public async Task<ActionResult<int>> RemoveUserFromTeam(int teamId, string userId)
        {
            var success = await this.teamService.RemoveUserFromTeamAsync(userId, teamId);

            if (!success)
            {
                return this.BadRequest();
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
        [Route(ProjectTeam)]
        public async Task<ActionResult<TeamDetailsServiceModel>> Details(int teamId)
            => await this.teamService.GetDetailsAsync(teamId);
    }
}
