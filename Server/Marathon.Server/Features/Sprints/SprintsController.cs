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
        [HasProjectTeamAuthorizationAttribute]
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
        [HasProjectTeamAuthorizationAttribute]
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
        [HasProjectTeamAuthorizationAttribute]
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
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult> Update(int projectId, int sprintId, [FromBody]UpdateSprintRequestModel input)
        {
            var updateRequest = await this.sprintService.UpdateAsync(
                sprintId,
                projectId,
                input.Title,
                input.Goal,
                input.StartDate,
                input.EndDate);

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
        /// Complete current sprint.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <param name="sprintId"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPatch]
        [Route(Sprints.Update)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult> Complete(int projectId, int sprintId, [FromBody] CompleteSprintRequestModel input)
        {
            var completeRequest = await this.sprintService.CompleteAsync(
                sprintId,
                input.NewSprintId,
                projectId);

            if (!completeRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = completeRequest.Errors,
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
        [HasProjectTeamAuthorizationAttribute]
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
    }
}
