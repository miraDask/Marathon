namespace Marathon.Server.Features.Projects
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Projects.Models;
    using Marathon.Server.Infrastructure.Extensions;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.WebConstants;

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProjectsController : ApiController
    {
        private readonly IProjectsService projectsService;

        public ProjectsController(IProjectsService projectsService)
        {
            this.projectsService = projectsService;
        }

        /// <summary>
        /// Get all projects for current user - creator or participant.
        /// </summary>
        /// <response code="200">Returns all projects for current user.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        public async Task<IEnumerable<ProjectListingServiceModel>> GetAll()
        {
            var userId = this.User.GetId();

            return await this.projectsService.GetAllByUserIdAsync(userId);
        }

        /// <summary>
        /// Creates new Project.
        /// </summary>
        /// <param name="input"></param>
        /// <response code="201"> Successfully created project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Create(CreateProjectRequestModel input)
        {
            var userId = this.User.GetId();

            var id = await this.projectsService.CreateAsync(
                input.Name,
                input.Key,
                input.ImageUrl,
                userId);

            return this.Created(nameof(this.Create), id);
        }

        /// <summary>
        /// Update current project.
        /// </summary>
        /// <param name="input"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPut]
        public async Task<ActionResult> Update(UpdateProjectRequestModel input)
        {
            var updated = await this.projectsService.UpdateAsync(
                input.Id,
                input.Name,
                input.Key,
                input.ImageUrl);

            if (!updated)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        /// <summary>
        /// Delete current project.
        /// </summary>
        /// <param name="projectId"></param>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(ProjectId)]
        public async Task<ActionResult> Delete(int projectId)
        {
            var deleted = await this.projectsService.DeleteAsync(projectId);

            if (!deleted)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        /// <summary>
        /// Get details for current project.
        /// </summary>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully return details for current project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(ProjectId)]
        public async Task<ActionResult<ProjectDetailsServiceModel>> Details(int projectId)
            => await this.projectsService.GetDetailsAsync(projectId);

        /// <summary>
        /// Assign current Team to current Project.
        /// </summary>
        /// <param name="input"></param>
        /// <response code="201"> Successfully assigned team to project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(ProjectId)]
        public async Task<ActionResult<int>> AssignTeamToProject(AddTeamToProjectRequestModel input)
        {
            var success = await this.projectsService.AddTeamToProjectAsync(input.ProjectId, input.TeamId);

            if (!success)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }
    }
}
