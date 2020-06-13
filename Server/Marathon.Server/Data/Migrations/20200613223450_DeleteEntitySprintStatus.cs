namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class DeleteEntitySprintStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SprintsStatuses");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SprintsStatuses",
                columns: table => new
                {
                    SprintId = table.Column<int>(type: "int", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SprintsStatuses", x => new { x.SprintId, x.StatusId });
                    table.ForeignKey(
                        name: "FK_SprintsStatuses_Sprints_SprintId",
                        column: x => x.SprintId,
                        principalTable: "Sprints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SprintsStatuses_Statuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Statuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SprintsStatuses_StatusId",
                table: "SprintsStatuses",
                column: "StatusId");
        }
    }
}
