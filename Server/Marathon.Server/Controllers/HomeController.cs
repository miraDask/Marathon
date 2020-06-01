namespace Marathon.Server.Controllers
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
