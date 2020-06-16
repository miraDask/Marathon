namespace Marathon.Server.Features.Sprints.Models
{
    using System.Collections.Generic;

    public class SprintWithStatusesServiceModel
    {
        public int Id { get; set; }

        public IEnumerable<int> Statuses { get; set; }
    }
}
