namespace Marathon.Server.Features.Issues.Models
{
    using Marathon.Server.Data.Enumerations;

    public class ChangeStatusRequestModel
    {
        public Status Status { get; set; }

        public int StatusIndex { get; set; }
    }
}
