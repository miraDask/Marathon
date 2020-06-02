namespace Marathon.Server.Features
{
    using Microsoft.AspNetCore.Mvc;

    [Route("/")]
    public class HomeController : ApiController
    {
        public ActionResult Get()
        {
            return this.Ok("OK");
        }
    }
}
