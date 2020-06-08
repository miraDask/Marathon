namespace Marathon.Server.Features.Issues
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Infrastructure.Extensions;
    using Marathon.Server.Infrastructure.Filters;
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
        [TypeFilter(typeof(HasProjectAuthorizationAttribute))]
        public async Task<ActionResult<int>> Create(int projectId, CreateIssueRequestModel input)
        {
            var userId = this.User.GetId();

            var id = await this.issuesService.CreateAsync(projectId, userId, input);

            return this.Created(nameof(this.Create), id);
        }

        /// <summary>
        /// Get details for current issue.
        /// </summary>
        /// <param name="issueId"></param>
        /// <param name="projectId"></param>
        /// <response code="201"> Successfully return details for current issue.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Issues.GetDetails)]
        [TypeFilter(typeof(HasProjectAuthorizationAttribute))]
        public async Task<ActionResult<IssueDetailsServiceModel>> Details(int projectId, int issueId)
        {
            var detailsRequest = await this.issuesService.GetDetailsAsync(issueId, projectId);

            if (!detailsRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = detailsRequest.Errors,
                });
            }

            return this.Ok(detailsRequest.Result);
        }
    }
}
