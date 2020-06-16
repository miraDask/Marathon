namespace Marathon.Server.Features.Statuses
{
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Statuses.Models;
    using Marathon.Server.Infrastructure.Filters;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class StatusesController : ApiController
    {
        private readonly IStatusesService statusService;

        public StatusesController(IStatusesService statusService)
        {
            this.statusService = statusService;
        }

        /// <summary>
        /// Creates new status.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully created status.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Statuses.Create)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult<int>> Create(int projectId, CreateStatusRequestModel input)
        {
            var id = await this.statusService.CreateAsync(input.Name, projectId);

            return this.Created(nameof(this.Create), id);
        }

        /// <summary>
        /// Delete current status.
        /// </summary>
        /// <param name="statusId"></param>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Statuses.Delete)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Delete(int statusId)
        {
            var deleteRequest = await this.statusService.DeleteAsync(statusId);

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
        /// Get all statuses for current project.
        /// </summary>
        /// <response code="200">Returns all statuses for current project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Statuses.GetAllForProject)]
        [HasProjectTeamAuthorization]
        public async Task<ActionResult<AllStatusesResponseModel>> GetAll(int projectId)
        {
            var getAllReaquest = await this.statusService.GetAllForProject(projectId);

            if (!getAllReaquest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = getAllReaquest.Errors,
                });
            }

            return this.Ok(getAllReaquest.Result);
        }
    }
}
