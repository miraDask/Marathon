namespace Marathon.Server.Infrastructure
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Base = Root + "/projects/{projectId}";

        public static class Identity
        {
            public const string Login = Root + "/identity/login";
            public const string Register = Root + "/identity/register";
        }

        public static class Teams
        {
            public const string Create = Base + "/teams";
            public const string Update = Base + "/teams/{teamId}";
            public const string GetAllInProject = Base + "/teams";
            public const string Delete = Base + "/teams/{teamId}";
            public const string AddUser = Base + "/teams/{teamId}";
            public const string GetDetails = Base + "/teams/{teamId}";
            public const string RemoveUser = Base + "/teams/{teamId}/{userId}";
        }

        public static class Projects
        {
            public const string Create = Root + "/projects";
            public const string GetAllForUser = Root + "/projects";
            public const string Update = Base;
            public const string GetDetails = Base;
            public const string Delete = Base;
            public const string AddTeam = Base + "/{teamId}";
            public const string RemoveTeam = Base + "/{teamId}";
        }

        public static class Sprints
        {
            public const string Create = Base + "/sprints";
            public const string GetAllForProject = Base + "/sprints";
            public const string Update = Base + "/sprints/{sprintId}";
            public const string GetDetails = Base + "/sprints/{sprintId}";
            public const string Delete = Base + "/sprints/{sprintId}";
            public const string AssignIssue = Base + "/sprints/{sprintId}/{issueId}";
            public const string RemoveIssue = Base + "/sprints/{sprintId}/{issueId}";
        }

        public static class Issues
        {
            public const string Create = Base + "/issues";
            public const string GetAllForProject = Base + "/issues";
            public const string Update = Base + "/issues/{issueId}";
            public const string GetDetails = Base + "/issues/{issueId}";
            public const string Delete = Base + "/issues/{issueId}";
        }
    }
}
