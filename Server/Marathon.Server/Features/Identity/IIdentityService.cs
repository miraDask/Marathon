namespace Marathon.Server.Features.Identity
{
    public interface IIdentityService
    {
        string GenerateJwtToken(string userId, string userName, string secret);
    }
}
