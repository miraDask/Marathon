namespace Marathon.Server.Features.Statuses
{
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Statuses.Models;
    using Marathon.Server.Infrastructure.Filters;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class StatusController : ApiController
    {
        private readonly IStatusesService statusService;

        public StatusController(IStatusesService statusService)
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
    }
}
