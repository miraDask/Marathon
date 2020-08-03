namespace Marathon.Server.Features.Invitations
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Invitations.Models;
    using Marathon.Server.Infrastructure.Extensions;
    using Marathon.Server.Infrastructure.Filters;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

    using static Marathon.Server.Infrastructure.ApiRoutes;

    public class InvitationsController : ApiController
    {
        private readonly IInvitationsService invitationsService;
        private readonly AppSettings appSettings;

        public InvitationsController(IInvitationsService invitationsService, IOptions<AppSettings> appSettings)
        {
            this.invitationsService = invitationsService;
            this.appSettings = appSettings.Value;
        }

        /// <summary>
        /// Invite current User to current Team.
        /// </summary>
        /// <param name="projectId"></param>
        /// <param name="teamId"></param>
        /// <param name="input"></param>
        /// <response code="200"> Successfully invited user to team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Teams.InviteUser)]
        [HasProjectAdminAuthorization]
        public async Task<ActionResult> InviteUserToTeam(int projectId, int teamId, [FromBody] InviteUserToTeamRequestModel input)
        {
            var senderId = this.User.GetId();
            var inviteUserRequest = await this.invitationsService.InviteUserToTeamAsync(input.Email, teamId, projectId, senderId);

            if (!inviteUserRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = inviteUserRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Accept current Invitation to join Team.
        /// </summary>
        /// <response code="200"> Successfully assigned user to team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Invitations.AcceptInvitation)]
        public async Task<ActionResult<string>> AcceptInvitation([FromBody] InvitationReaquestModel input)
        {
            var acceptInvitationRequest = await this.invitationsService.AcceptInvitaionToTeamAsync(input.InvitationId, this.appSettings.Secret);

            if (!acceptInvitationRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = acceptInvitationRequest.Errors,
                });
            }

            return this.Ok(acceptInvitationRequest.Result);
        }

        /// <summary>
        /// Get All Invitations.
        /// </summary>
        /// <response code="200"> Successfully assigned user to team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpGet]
        [Route(Invitations.GetInvitations)]
        public async Task<IEnumerable<InvitationServiceModel>> GetAll()
        {
            var userId = this.User.GetId();
            return await this.invitationsService.GetAllAsync(userId);
        }

        /// <summary>
        /// Decline current invitation.
        /// </summary>
        /// <response code="200">Successfully declined.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPatch]
        [Route(Invitations.DeclineInvitation)]
        public async Task<ActionResult> Decline([FromBody]InvitationReaquestModel input)
        {
            var declineRequest = await this.invitationsService.DeclineAsync(input.InvitationId);

            if (!declineRequest.Success)
            {
                return this.BadRequest(new ErrorsResponseModel
                {
                    Errors = declineRequest.Errors,
                });
            }

            return this.Ok();
        }

        /// <summary>
        /// Delete current invitation.
        /// </summary>
        /// <response code="200">Successfully deleted.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpDelete]
        [Route(Invitations.DeleteInvitation)]
        public async Task<ActionResult> Delete([FromBody] InvitationReaquestModel input)
        {
            var deleteRequest = await this.invitationsService.DeleteAsync(input.InvitationId);

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
