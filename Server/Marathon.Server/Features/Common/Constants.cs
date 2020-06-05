namespace Marathon.Server.Features.Common
{
    public static class Constants
    {
        public static class Errors
        {
            public const string AlreadyRegisteredUser = "User with email: {0} is alredy registered.";
            public const string InvalidUserName = "Invalid username.";
            public const string InvalidPassword = "Invalid password.";
            public const string InvalidProjectId = "Invalid project id.";
        }

        public static class Claims
        {
            public const string Admin = "Admin";
        }
    }
}
