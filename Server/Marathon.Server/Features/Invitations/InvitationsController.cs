namespace Marathon.Server.Features.Invitations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Invitations.Models;
    using Marathon.Server.Infrastructure.Extensions;
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
        /// Accept current Invitation to join Team.
        /// </summary>
        /// <response code="200"> Successfully assigned user to team.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [Route(Invitations.AcceptInvitation)]
        public async Task<ActionResult<string>> AcceptInvitation([FromBody] AcceptInvitationToTeamReaquestModel input)
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
    }
}
