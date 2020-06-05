namespace Marathon.Server.Infrastructure
{
    public static class ApiRoutes
    {
        public const string Root = "api";

        public static class Identity
        {
            public const string Login = Root + "/identity/login";
            public const string Register = Root + "/identity/register";
        }

        public static class Teams
        {
            public const string Create = Root + "/teams";
            public const string Update = Root + "/teams";
            public const string GetAllInProject = Root + "/teams/{projectId}";
            public const string Delete = Root + "/teams/{teamId}";
            public const string AddUser = Root + "/teams/{teamId}";
            public const string RemoveUser = Root + "teams/{teamId}/{userId}";
            public const string GetDetails = Root + "teams/{projectId}/{teamId}";
        }

        public static class Projects
        {
            public const string Create = Root + "/projects";
            public const string GetAllForUser = Root + "/projects";
            public const string Update = Root + "/projects/{projectId}";
            public const string GetDetails = Root + "/projects/{projectId}";
            public const string Delete = Root + "/projects/{projectId}";
            public const string AddTeam = Root + "/projects/{projectId}/{teamId}";
            public const string RemoveTeam = Root + "/projects/{projectId}/{teamId}";
        }
    }
}
