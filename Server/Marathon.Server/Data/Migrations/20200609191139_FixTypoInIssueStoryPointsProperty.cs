namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class FixTypoInIssueStoryPointsProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoryPoins",
                table: "Issues");

            migrationBuilder.AddColumn<int>(
                name: "StoryPoints",
                table: "Issues",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoryPoints",
                table: "Issues");

            migrationBuilder.AddColumn<int>(
                name: "StoryPoins",
                table: "Issues",
                type: "int",
                nullable: true);
        }
    }
}
