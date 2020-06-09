namespace Marathon.Server.Features.Common
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ApiController : ControllerBase
    {
    }
}
