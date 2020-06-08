namespace Marathon.Server.Features.Common
{
    public static class Constants
    {
        public static class Errors
        {
            public const string UnuthorizedUser = "Unauthorized user or invalid project id";
            public const string AlreadyRegisteredUser = "User with email: {0} is alredy registered.";
            public const string InvalidUserName = "Invalid username.";
            public const string InvalidUserId = "Invalid user id.";
            public const string InvalidPassword = "Invalid password.";
            public const string InvalidProjectId = "Invalid project id.";
            public const string InvalidTeamId = "Invalid team id.";
            public const string InvalidTeamIdOrUserId = "Invalid user or team id.";
            public const string InvalidUserOrEmail = "Invalid user or email";
            public const string InvalidIssueId = "Invalid issue Id";
        }

        public static class Claims
        {
            public const string Admin = "Admin";
        }
    }
}
