namespace Marathon.Server.Features.Projects
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Projects.Models;
    using Marathon.Server.Infrastructure.Extensions;
    using Marathon.Server.Infrastructure.Filters;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProjectsController : ControllerBase
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
        [Route(Projects.GetAllForUser)]
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
        [Route(Projects.Create)]
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
        /// <param name="projectId"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPut]
        [Route(Projects.Update)]
        [TypeFilter(typeof(HasProjectAuthorizationAttribute))]
        public async Task<ActionResult> Update(int projectId, UpdateProjectRequestModel input)
        {
            var updateRequest = await this.projectsService.UpdateAsync(
                projectId,
                input.Name,
                input.Key,
                input.ImageUrl);

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
        /// Delete current project.
        /// </summary>
        /// <param name="projectId"></param>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Projects.Delete)]
        [TypeFilter(typeof(HasProjectAuthorizationAttribute))]
        public async Task<ActionResult> Delete(int projectId)
        {
            var deleteRequest = await this.projectsService.DeleteAsync(projectId);

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
        /// Get details for current project.
        /// </summary>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully return details for current project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Projects.GetDetails)]
        [TypeFilter(typeof(HasProjectAuthorizationAttribute))]
        public async Task<ActionResult<ProjectDetailsServiceModel>> Details(int projectId)
        {
            var detailsRequest = await this.projectsService.GetDetailsAsync(projectId);

            if (!detailsRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = detailsRequest.Errors,
                });
            }

            return this.Ok(detailsRequest.Result);
        }

        /// <summary>
        /// Assign current Team to current Project.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="teamId"></param>
        /// <response code="201"> Successfully assigned team to project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Projects.AddTeam)]
        [TypeFilter(typeof(HasProjectAuthorizationAttribute))]
        public async Task<ActionResult> AssignTeamToProject(int projectId, int teamId)
        {
            var assignTeamRequest = await this.projectsService.AddTeamToProjectAsync(projectId, teamId);

            if (!assignTeamRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = assignTeamRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Remove current Team from current Project.
        /// </summary>
        /// <param name="teamId"></param>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully removed team from project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Projects.RemoveTeam)]
        [TypeFilter(typeof(HasProjectAuthorizationAttribute))]
        public async Task<ActionResult<int>> RemoveTeamFromProject(int projectId, int teamId)
        {
            var removeTeamRequest = await this.projectsService.RemoveTeamFromProjectAsync(projectId, teamId);

            if (!removeTeamRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = removeTeamRequest.Errors,
                });
            }

            return this.Ok();
        }
    }
}
