namespace Marathon.Server.Features.Common.Models
{
    using System.Collections.Generic;

    public class ResultModel<T>
    {
        public ResultModel()
        {
            this.Errors = new HashSet<string>();
        }

        public bool Success { get; set; }

        public IEnumerable<string> Errors { get; set; }

        public T Result { get; set; }
    }
}
