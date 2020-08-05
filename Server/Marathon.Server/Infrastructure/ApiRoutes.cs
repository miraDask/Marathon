namespace Marathon.Server.Infrastructure
{
    public static class ApiRoutes
    {
        public const string Root = "api";
        public const string Base = Root + "/projects/{projectId}";

        public static class Identity
        {
            public const string IdentityRoute = Root + "/identity";
            public const string Login = IdentityRoute + "/login";
            public const string Register = IdentityRoute + "/register";
            public const string Logout = IdentityRoute + "/logout";
            public const string UpdateUser = IdentityRoute + "/user";
            public const string GetUser = IdentityRoute + "/user";
        }

        public static class Teams
        {
            public const string Create = Base + "/teams";
            public const string Update = Base + "/teams/{teamId}";
            public const string GetAllInProject = Base + "/teams";
            public const string Delete = Base + "/teams/{teamId}";
            public const string GetDetails = Base + "/teams/{teamId}";
            public const string InviteUser = Base + "/teams/{teamId}/invite";
            public const string RemoveUser = Base + "/teams/{teamId}/remove";
        }

        public static class Invitations
        {
            public const string AcceptInvitation = Root + "/projects/invitations";
            public const string GetInvitations = Root + "/projects/invitations";
            public const string DeleteInvitation = Root + "/projects/invitations";
            public const string DeclineInvitation = Root + "/projects/invitations";
        }

        public static class Projects
        {
            public const string Create = Root + "/projects";
            public const string GetAllForUser = Root + "/projects";
            public const string Update = Base;
            public const string GetDetails = Base;
            public const string Delete = Base;
            public const string AssignAdmin = Base + "/administration/{userId}";
            public const string RemoveAdmin = Base + "/administration/{userId}";
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
            public const string AddStatus = Base + "/sprints/{sprintId}/statuses";
            public const string GetAllStatuses = Base + "/sprints/{sprintId}/statuses";
            public const string RemoveStatus = Base + "/sprints/{sprintId}/statuses/{statusId}";
        }

        public static class Issues
        {
            public const string Create = Base + "/issues";
            public const string GetAllForProject = Base + "/issues";
            public const string Update = Base + "/issues/{issueId}";
            public const string GetDetails = Base + "/issues/{issueId}";
            public const string Delete = Base + "/issues/{issueId}";
            public const string ChangeStatus = Base + "/issues/{issueId}";
        }

        public static class Statuses
        {
            public const string Create = Base + "/statuses";
            public const string GetAllForProject = Base + "/statuses";
            public const string Update = Base + "/statuses/{statusId}";
            public const string Delete = Base + "/statuses/{statusId}";
        }
    }
}
