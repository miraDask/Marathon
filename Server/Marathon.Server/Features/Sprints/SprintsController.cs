namespace Marathon.Server.Features.Sprints
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Sprints.Models;

    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class SprintsController : ApiController
    {
        private readonly ISprintService sprintService;

        public SprintsController(ISprintService sprintService)
        {
            this.sprintService = sprintService;
        }

        /// <summary>
        /// Creates new Sprint.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully created sprint.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Sprints.Create)]
        public async Task<ActionResult<int>> Create(int projectId, CreateSprintRequestModel input)
        {
            var id = await this.sprintService.CreateAsync(
                projectId,
                input.Title,
                input.Goal,
                input.DurationInWeeks,
                input.StartDate);

            return this.Created(nameof(this.Create), id);
        }
    }
}
