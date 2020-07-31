﻿namespace Marathon.Server.Features.Invitations
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Invitations.Models;

    public interface IInvitationsService
    {
        Task<ResultModel<string>> AcceptInvitaionToTeamAsync(int invitationId, string secret);

        Task<IEnumerable<InvitationServiceModel>> GetAllAsync(string userId);
    }
}
