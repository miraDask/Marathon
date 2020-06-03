namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddImageUrlToUserTeamAndProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Teams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Projects",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "AspNetUsers");
        }
    }
}
