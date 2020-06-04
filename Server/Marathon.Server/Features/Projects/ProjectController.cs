namespace Marathon.Server.Features.Projects
{
    using System.Threading.Tasks;

    using Marathon.Server.Features.Projects.Models;
    using Marathon.Server.Infrastructure.Extensions;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProjectController : ApiController
    {
        private readonly IProjectsService projectsService;

        public ProjectController(IProjectsService projectsService)
        {
            this.projectsService = projectsService;
        }

        /// <summary>
        /// Creates new Project.
        /// </summary>
        /// <param name="input"></param>
        /// <response code="201"> Successfully created project.</response>
        /// <response code="400"> Bad Reaquest.</response>
        /// <response code="401"> Unauthorized request.</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Create(CreateProjectRequestModel input)
        {
            var userId = this.User.GetId();

            var id = await this.projectsService.CreateAsync(
                input.Name,
                input.Key,
                input.ImageUrl,
                userId);

            return this.Created(nameof(this.Create), id);
        }
    }
}
