namespace Marathon.Server.Features.Statuses.Models
{
    using System.Collections.Generic;

    using Marathon.Server.Features.Status.Models;

    public class AllStatusesResponseModel
    {
        public int Id { get; set; }

        public IEnumerable<StatusListingModel> Statuses { get; set; }
    }
}
