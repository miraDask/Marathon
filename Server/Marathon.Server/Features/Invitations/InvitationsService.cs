﻿namespace Marathon.Server.Features.Invitations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity;
    using Marathon.Server.Features.Invitations.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants;

    public class InvitationsService : IInvitationsService
    {
        private readonly MarathonDbContext dbContext;
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identityService;

        public InvitationsService(MarathonDbContext dbContext, UserManager<User> userManager, IIdentityService identityService)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.identityService = identityService;
        }

        public async Task<ResultModel<string>> AcceptInvitaionToTeamAsync(int invitationId, string secret)
        {
            var invitation = await this.dbContext.Invitations.FirstOrDefaultAsync(x => x.Id == invitationId);

            if (invitation == null)
            {
                return new ResultModel<string>
                {
                    Errors = new string[] { Errors.InvalidInvitationId },
                };
            }

            var user = await this.userManager.FindByIdAsync(invitation.RecipientId);

            var teamUser = new TeamUser()
            {
                TeamId = invitation.TeamId,
                UserId = invitation.RecipientId,
            };

            await this.dbContext.TeamsUsers.AddAsync(teamUser);

            invitation.Accepted = true;
            this.dbContext.Update(invitation);

            await this.dbContext.SaveChangesAsync();

            var token = await this.identityService.AddClaimToUserAsync(user.Id, Claims.Team, invitation.ProjectId.ToString(), secret);

            return new ResultModel<string>
            {
                Success = true,
                Result = token,
            };
        }

        public async Task<IEnumerable<InvitationServiceModel>> GetAllAsync(string userId)
        => await this.dbContext.Invitations
            .Where(x => x.RecipientId == userId && !x.Accepted && !x.Declined)
            .Select(x => new InvitationServiceModel
            {
                Id = x.Id,
                SenderFullName = x.Sender.FullName,
                ProjectName = x.Project.Name,
                TeamName = x.Team.Title,
            })
            .ToArrayAsync();
    }
}
