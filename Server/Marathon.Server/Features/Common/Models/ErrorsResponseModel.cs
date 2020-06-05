namespace Marathon.Server.Features.Common.Models
{
    using System.Collections.Generic;

    public class ErrorsResponseModel
    {
        public IEnumerable<string> Errors { get; set; }
    }
}
