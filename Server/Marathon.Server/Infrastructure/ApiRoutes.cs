namespace Marathon.Server.Infrastructure
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string ProjectRoute = "/projects/{projectId}";

        public static class Identity
        {
            public const string Login = Root + "/identity/login";
            public const string Register = Root + "/identity/register";
        }

        public static class Teams
        {
            public const string Create = Root + ProjectRoute + "/teams";
            public const string Update = Root + ProjectRoute + "/teams/{teamId}";
            public const string GetAllInProject = Root + ProjectRoute + "/teams";
            public const string Delete = Root + ProjectRoute + "/teams/{teamId}";
            public const string AddUser = Root + ProjectRoute + "/teams/{teamId}";
            public const string GetDetails = Root + ProjectRoute + "/teams/{teamId}";
            public const string RemoveUser = Root + ProjectRoute + "/teams/{teamId}/{userId}";
        }

        public static class Projects
        {
            public const string Create = Root + "/projects";
            public const string GetAllForUser = Root + "/projects";
            public const string Update = Root + ProjectRoute;
            public const string GetDetails = Root + ProjectRoute;
            public const string Delete = Root + ProjectRoute;
            public const string AddTeam = Root + ProjectRoute + "/{teamId}";
            public const string RemoveTeam = Root + ProjectRoute + "/{teamId}";
        }
    }
}
