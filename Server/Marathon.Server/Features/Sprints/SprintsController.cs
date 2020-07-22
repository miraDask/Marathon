namespace Marathon.Server.Features.Sprints
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Sprints.Models;
    using Marathon.Server.Infrastructure.Filters;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class SprintsController : ApiController
    {
        private readonly ISprintsService sprintService;

        public SprintsController(ISprintsService sprintService)
        {
            this.sprintService = sprintService;
        }

        /// <summary>
        /// Creates new Sprint.
        /// </summary>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully created sprint.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Sprints.Create)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult<SprintListingServiceModel>> Create(int projectId)
        {
            var model = await this.sprintService.CreateAsync(projectId);

            return this.Created(nameof(this.Create), model);
        }

        /// <summary>
        /// Get all sprints for current project.
        /// </summary>
        /// <response code="200">Returns all sprints for current project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Sprints.GetAllForProject)]
        [HasProjectTeamAuthorization]
        public async Task<ActionResult<IEnumerable<SprintListingServiceModel>>> GetAll(int projectId)
        {
            var getAllReaquest = await this.sprintService.GetAllByProjecIdAsync(projectId);

            if (!getAllReaquest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = getAllReaquest.Errors,
                });
            }

            return this.Ok(getAllReaquest.Result);
        }

        /// <summary>
        /// Get details for current sprint.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="sprintId"></param>
        /// <response code="200"> Successfully return details for current sprint.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Sprints.GetDetails)]
        [HasProjectTeamAuthorization]
        public async Task<ActionResult<SprintDetailsServiceModel>> Details(int projectId, int sprintId)
        {
            var detailsRequest = await this.sprintService.GetDetailsAsync(sprintId, projectId);

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
        /// Update current sprint.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <param name="sprintId"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPut]
        [Route(Sprints.Update)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Update(int projectId, int sprintId, [FromBody]UpdateSprintRequestModel input)
        {
            var updateRequest = await this.sprintService.UpdateAsync(
                sprintId,
                projectId,
                input.Title,
                input.Goal,
                input.DurationInWeeks,
                input.StartDate);

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
        /// Delete current sprint.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="sprintId"></param>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Sprints.Delete)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Delete(int projectId, int sprintId)
        {
            var deleteRequest = await this.sprintService.DeleteAsync(sprintId, projectId);

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
        /// Assign current Issue to current Sprint.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="sprintId"></param>
        /// <param name="issueId"></param>
        /// <response code="200"> Successfully assigned issue to sprint.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Sprints.AssignIssue)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> AssignIssueToSprint(int projectId, int sprintId, int issueId)
        {
            var assignIssueRequest = await this.sprintService.AssignIssueToSprintAsync(projectId, sprintId, issueId);

            if (!assignIssueRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = assignIssueRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Remove current Issue from current Sprint.
        /// </summary>
        /// <param name="sprintId"></param>
        /// <param name="issueId"></param>
        /// <response code="200"> Successfully removed issue from sprint.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Sprints.RemoveIssue)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult<int>> RemoveIssueFromSprint(int sprintId, int issueId)
        {
            var removeIssueRequest = await this.sprintService.RemoveIssueFromSprintAsync(sprintId, issueId);

            if (!removeIssueRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = removeIssueRequest.Errors,
                });
            }

            return this.Ok();
        }
    }
}
