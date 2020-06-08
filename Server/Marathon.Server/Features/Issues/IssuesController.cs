namespace Marathon.Server.Features.Issues
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Infrastructure.Extensions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class IssuesController : ControllerBase
    {
        private readonly IIssuesService issuesService;

        public IssuesController(IIssuesService issuesService)
        {
            this.issuesService = issuesService;
        }

        /// <summary>
        /// Creates new Issue.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully created issue.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Issues.Create)]
        public async Task<ActionResult<int>> Create(int projectId, CreateIssueRequestModel input)
        {
            var userId = this.User.GetId();

            var id = await this.issuesService.CreateAsync(projectId, userId, input);

            return this.Created(nameof(this.Create), id);
        }
    }
}
