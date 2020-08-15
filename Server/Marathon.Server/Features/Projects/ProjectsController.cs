namespace Marathon.Server.Features.Projects
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Projects.Models;
    using Marathon.Server.Infrastructure.Extensions;
    using Marathon.Server.Infrastructure.Filters;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    using static Marathon.Server.Features.Common.Constants;
    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class ProjectsController : ApiController
    {
        private readonly IProjectsService projectsService;
        private readonly IIdentityService identityService;
        private readonly AppSettings appSettings;

        public ProjectsController(
            IProjectsService projectsService,
            IIdentityService identityService,
            IOptions<AppSettings> appSettings)
        {
            this.projectsService = projectsService;
            this.identityService = identityService;
            this.appSettings = appSettings.Value;
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
        public async Task<ActionResult<CreateProjectResponseModel>> Create([FromBody]CreateProjectRequestModel input)
        {
            var userId = this.User.GetId();

            var projectId = await this.projectsService.CreateAsync(
                input.Name,
                input.Key,
                input.ImageUrl,
                userId);

            var newToken = await this.identityService.AddClaimToUserAsync(userId, Claims.Admin, projectId.ToString(), this.appSettings.Secret);

            return this.Created(nameof(this.Create), new CreateProjectResponseModel { Id = projectId, Token = newToken });
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
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Update(int projectId, [FromBody]UpdateProjectRequestModel input)
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
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Delete(int projectId)
        {
            var deleteRequest = await this.projectsService.DeleteAsync(projectId, this.appSettings.Secret);

            if (!deleteRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = deleteRequest.Errors,
                });
            }

            return this.Ok(deleteRequest.Result);
        }

        /// <summary>
        /// Get details for current project.
        /// </summary>
        /// <param name="projectId"></param>
        /// <response code="200"> Successfully return details for current project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Projects.GetDetails)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult<ProjectDetailsServiceModel>> Details(int projectId)
        {
            var userId = this.User.GetId();
            var detailsRequest = await this.projectsService.GetDetailsAsync(projectId, userId);

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
        /// <response code="200"> Successfully assigned team to project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Projects.AddTeam)]
        [HasProjectAdminAuthorization]
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
        /// <response code="200"> Successfully removed team from project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Projects.RemoveTeam)]
        [HasProjectAdminAuthorization]
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

        /// <summary>
        /// Assign current User to current Project as Admin.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="userId"></param>
        /// <response code="200"> Successfully assigned admin to project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Projects.AssignAdmin)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult<AuthResponseModel>> AssignAdminToProject(int projectId, string userId)
        {
            var assignAdminRequest = await this.projectsService.AddAdminToProjectAsync(userId, projectId);

            if (!assignAdminRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = assignAdminRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Remove current User from current Project as Admin.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="userId"></param>
        /// <response code="200"> Successfully removed team from project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Projects.RemoveAdmin)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> RemoveAdminFromProject(int projectId, string userId)
        {
            var removeAdminRequest = await this.projectsService.RemoveAdminFromProjectAsync(userId, projectId);

            if (!removeAdminRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = removeAdminRequest.Errors,
                });
            }

            return this.Ok();
        }
    }
}
