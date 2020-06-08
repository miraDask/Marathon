namespace Marathon.Server.Data.Common
{
    public static class Constants
    {
        public static class Seeding
        {
            public const string UserName = "firstUser";

            public const string Email = "firstUser@user.com";

            public const string Password = "123456";

            public const string ToDoStatus = "ToDo";

            public const string InProgressStatus = "In Progress";

            public const string DoneStatus = "Done";
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
            public const int TitleMaxLength = 25;
            public const int GoalMaxLength = 500;
        }

        public static class Status
        {
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
            public const int KeyMinLength = 3;
            public const int KeyMaxLength = 10;
        }
    }
}
