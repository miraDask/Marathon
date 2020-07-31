﻿namespace Marathon.Server.Features.Teams
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Marathon.Server.Data;
    using Marathon.Server.Data.Models;
    using Marathon.Server.Features.Common.Models;
    using Marathon.Server.Features.Identity;
    using Marathon.Server.Features.Identity.Models;
    using Marathon.Server.Features.Teams.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using static Marathon.Server.Features.Common.Constants;

    public class TeamsService : ITeamsService
    {
        private readonly MarathonDbContext dbContext;
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identityService;

        public TeamsService(
            MarathonDbContext dbContext,
            UserManager<User> userManager,
            IIdentityService identityService)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
            this.identityService = identityService;
        }

        public async Task<ResultModel<bool>> InviteUserToTeamAsync(string email, int teamId, int projectId, string senderId)
        {
            var user = await this.userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidUserId },
                };
            }

            var invitation = new Invitation
            {
                ProjectId = projectId,
                TeamId = teamId,
                RecipientId = user.Id,
                SenderId = senderId,
            };

            await this.dbContext.AddAsync(invitation);
            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<int>> CreateAsync(string title, string imageUrl, int projectId)
        {
            var project = await this.dbContext.Projects.FirstOrDefaultAsync(x => x.Id == projectId);

            if (project == null)
            {
                return new ResultModel<int>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            var team = new Team
            {
                Title = title,
                ImageUrl = imageUrl,
                ProjectId = projectId,
            };

            this.dbContext.Add(team);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<int>
            {
                Success = true,
                Result = team.Id,
            };
        }

        public async Task<ResultModel<bool>> DeleteAsync(int id)
        {
            var team = await this.GetByIdAsync(id);

            if (team == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidTeamId },
                };
            }

            team.IsDeleted = true;
            team.DeletedOn = DateTime.UtcNow;

            this.dbContext.Teams.Update(team);

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<IEnumerable<TeamListingServiceModel>>> GetAllByProjectIdAsync(int id)
        {
            var getAllTeamsResult = await this.dbContext
                .Teams
                .Where(x => x.ProjectId == id)
                .OrderByDescending(x => x.ModifiedOn)
                .Select(x => new TeamListingServiceModel()
                {
                    Id = x.Id,
                    Title = x.Title,
                    ImageUrl = x.ImageUrl,
                })
                .ToListAsync();

            if (getAllTeamsResult == null)
            {
                return new ResultModel<IEnumerable<TeamListingServiceModel>>
                {
                    Errors = new string[] { Errors.InvalidProjectId },
                };
            }

            return new ResultModel<IEnumerable<TeamListingServiceModel>>
            {
                Success = true,
                Result = getAllTeamsResult,
            };
        }

        public async Task<ResultModel<TeamDetailsServiceModel>> GetDetailsAsync(int id)
        {
            var invitedUsersEmails = await this.dbContext.Invitations
                .Where(x => x.TeamId == id && !x.Accepted)
                .Select(x => x.Recipient.Email)
                .ToListAsync();

            var detailsResult = await this.dbContext
                .Teams
                .Where(x => x.Id == id)
                .Select(x => new TeamDetailsServiceModel()
                {
                    Title = x.Title,
                    ImageUrl = x.ImageUrl,
                    TeamUsers = x.TeamsUsers.Select(x => new UserDetailsServiceModel()
                    {
                        Id = x.User.Id,
                        FullName = x.User.FullName,
                        Email = x.User.Email,
                        ImageUrl = x.User.ImageUrl,
                    }),
                    InvitedUsersEmails = invitedUsersEmails,
                })
                .FirstOrDefaultAsync();

            if (detailsResult == null)
            {
                return new ResultModel<TeamDetailsServiceModel>
                {
                    Errors = new string[] { Errors.InvalidTeamId },
                };
            }

            return new ResultModel<TeamDetailsServiceModel>
            {
                Success = true,
                Result = detailsResult,
            };
        }

        public async Task<ResultModel<bool>> RemoveUserFromTeamAsync(string userId, int teamId, int projectId)
        {
            var teamUser = await this.dbContext.TeamsUsers.FirstOrDefaultAsync(x => x.UserId == userId && x.TeamId == teamId);
            if (teamUser == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidTeamIdOrUserId },
                };
            }

            this.dbContext.TeamsUsers.Remove(teamUser);
            await this.dbContext.SaveChangesAsync();

            await this.identityService.RemoveClaimFromUserAsync(userId, Claims.Team, projectId.ToString());
            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        public async Task<ResultModel<bool>> UpdateAsync(int id, string title, string imageUrl, int projectId)
        {
            var team = await this.GetByIdAsync(id);

            if (team == null)
            {
                return new ResultModel<bool>
                {
                    Errors = new string[] { Errors.InvalidTeamId },
                };
            }

            team.Title = title;
            team.ImageUrl = imageUrl;
            team.ProjectId = projectId;
            team.ModifiedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();

            return new ResultModel<bool>
            {
                Success = true,
            };
        }

        private async Task<Team> GetByIdAsync(int id)
        => await this.dbContext
                .Teams
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
    }
}
