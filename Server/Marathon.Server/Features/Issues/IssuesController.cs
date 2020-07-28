namespace Marathon.Server.Features.Issues
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Issues.Models;
    using Marathon.Server.Infrastructure.Extensions;
    using Marathon.Server.Infrastructure.Filters;

    using Microsoft.AspNetCore.Mvc;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class IssuesController : ApiController
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
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult<int>> Create(int projectId, [FromBody]CreateIssueRequestModel input)
        {
            var userId = this.User.GetId();

            var id = await this.issuesService.CreateAsync(projectId, userId, input);

            return this.Created(nameof(this.Create), id);
        }

        /// <summary>
        /// Update current issue.
        /// </summary>
        /// <param name="input"></param>
        /// <param name="projectId"></param>
        /// <param name="issueId"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPut]
        [Route(Issues.Update)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult> Update(int projectId, int issueId, [FromBody]UpdateIssueRequestModel input)
        {
            var updateRequest = await this.issuesService.UpdateAsync(issueId, projectId, input);

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
        /// Delete current issue.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="issueId"></param>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Issues.Delete)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> Delete(int projectId, int issueId)
        {
            var updateRequest = await this.issuesService.DeleteAsync(issueId, projectId);

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
        /// Get details for current issue.
        /// </summary>
        /// <param name="issueId"></param>
        /// <param name="projectId"></param>
        /// <response code="200"> Successfully return details for current issue.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Issues.GetDetails)]
        [HasProjectTeamAuthorizationAttribute]
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

        /// <summary>
        /// Get all issues for current project - creator.
        /// </summary>
        /// <response code="200">Returns all issues for current project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Issues.GetAllForProject)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult<IEnumerable<IssueListingServiceModel>>> GetAll(int projectId)
        {
            var getAllReaquest = await this.issuesService.GetAllByProjecIdAsync(projectId);

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
        /// Change status of current issue.
        /// </summary>
        /// <param name="issueId"></param>
        /// <param name="projectId"></param>
        /// <param name="model"></param>
        /// <response code="200">Successfully updated.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPatch]
        [Route(Issues.ChangeStatus)]
        [HasProjectTeamAuthorizationAttribute]
        public async Task<ActionResult<UserListingServerModel>> ChangeStatus(int issueId, int projectId, [FromBody] ChangeStatusRequestModel model)
        {
            var userId = this.User.GetId();

            var updateRequest = await this.issuesService.ChangeStatusAsync(issueId, model.Status, model.StatusIndex, projectId, userId);

            if (!updateRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = updateRequest.Errors,
                });
            }

            return this.Ok(updateRequest.Result);
        }
    }
}
