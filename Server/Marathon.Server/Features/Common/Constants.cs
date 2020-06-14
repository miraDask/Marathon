namespace Marathon.Server.Features.Common
{
    public static class Constants
    {
        public const string DeactivatedTokenString = "token: {0} deactivated";

        public static class Errors
        {
            public const string UnuthorizedUser = "Unauthorized user or invalid project id";
            public const string AlreadyRegisteredUser = "User with email: {0} is alredy registered.";
            public const string InvalidUserName = "Invalid username.";
            public const string InvalidUserId = "Invalid user id.";
            public const string InvalidPassword = "Invalid password.";
            public const string InvalidProjectId = "Invalid project id.";
            public const string InvalidTeamId = "Invalid team id.";
            public const string InvalidSprintId = "Invalid sprint id.";
            public const string InvalidTeamIdOrUserId = "Invalid user or team id.";
            public const string InvalidUserOrEmail = "Invalid user or email";
            public const string InvalidIssueId = "Invalid issue Id";
            public const string InvalidStatusId = "Invalid status Id";
            public const string InvalidUserOrProjectId = "Invalid user or project Id";
        }

        public static class Claims
        {
            public const string Admin = "Admin";
            public const string Team = "Team";
        }

        public static class Redis
        {
            public const string Connection = "localhost";
            public const int Port = 6379;
            public const string Channel = "marathon";
        }
    }
}
