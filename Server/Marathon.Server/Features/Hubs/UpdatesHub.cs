namespace Marathon.Server.Features.Hubs
{
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.SignalR;

    public class UpdatesHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            var projectsClaims = this.Context.User.Claims.Where(x => x.Type == "Admin" || x.Type == "Team").ToList();
            projectsClaims.ForEach(x => this.Groups.AddToGroupAsync(this.Context.ConnectionId, x.Value.ToString()));
            return base.OnConnectedAsync();
        }
    }
}
