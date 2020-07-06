namespace Marathon.Server.Data.Common
{
    public static class Constants
    {
        public static class Seeding
        {
            public const string FullName = "First User";

            public const string UserName = "FirstUser";

            public const string Email = "user@user.com";

            public const string Password = "123456";

            public const string ToDoStatus = "ToDo";
        }

        public static class User
        {
            public const int UserNameMinLength = 5;
            public const int UserNameMaxLength = 25;
        }

        public static class Issue
        {
            public const int TitleMinLength = 3;
            public const int TitleMaxLength = 50;
            public const int DescriptionMinLength = 3;
            public const int DescriptionMaxLength = 500;
        }

        public static class Sprint
        {
            public const int TitleMinLength = 3;
            public const int TitleMaxLength = 25;
            public const int GoalMinLength = 2;
            public const int GoalMaxLength = 500;
        }

        public static class Status
        {
            public const int NameMinLength = 2;
            public const int NameMaxLength = 25;
        }

        public static class Team
        {
            public const int TitleMinLength = 3;
            public const int TitleMaxLength = 50;
        }

        public static class Project
        {
            public const int NameMinLength = 3;
            public const int NameMaxLength = 80;
            public const int KeyMinLength = 2;
            public const int KeyMaxLength = 10;
        }
    }
}
