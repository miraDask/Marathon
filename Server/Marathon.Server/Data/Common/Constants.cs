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
            public const int TitleMaxLength = 50;
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
    }
}
