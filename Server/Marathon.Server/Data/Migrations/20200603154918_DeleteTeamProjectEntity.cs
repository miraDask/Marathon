namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class DeleteTeamProjectEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeamsProjects");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Teams",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Teams_ProjectId",
                table: "Teams",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Teams_Projects_ProjectId",
                table: "Teams",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Teams_Projects_ProjectId",
                table: "Teams");

            migrationBuilder.DropIndex(
                name: "IX_Teams_ProjectId",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Teams");

            migrationBuilder.CreateTable(
                name: "TeamsProjects",
                columns: table => new
                {
                    TeamId = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamsProjects", x => new { x.TeamId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_TeamsProjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TeamsProjects_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TeamsProjects_ProjectId",
                table: "TeamsProjects",
                column: "ProjectId");
        }
    }
}
