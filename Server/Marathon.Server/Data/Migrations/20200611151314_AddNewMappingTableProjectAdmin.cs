namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddNewMappingTableProjectAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAdmin_Projects_ProjectId",
                table: "ProjectAdmin");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectAdmin_AspNetUsers_UserId",
                table: "ProjectAdmin");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectAdmin",
                table: "ProjectAdmin");

            migrationBuilder.RenameTable(
                name: "ProjectAdmin",
                newName: "ProjectsAdmins");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectAdmin_ProjectId",
                table: "ProjectsAdmins",
                newName: "IX_ProjectsAdmins_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectsAdmins",
                table: "ProjectsAdmins",
                columns: new[] { "UserId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectsAdmins_Projects_ProjectId",
                table: "ProjectsAdmins",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectsAdmins_AspNetUsers_UserId",
                table: "ProjectsAdmins",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectsAdmins_Projects_ProjectId",
                table: "ProjectsAdmins");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectsAdmins_AspNetUsers_UserId",
                table: "ProjectsAdmins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectsAdmins",
                table: "ProjectsAdmins");

            migrationBuilder.RenameTable(
                name: "ProjectsAdmins",
                newName: "ProjectAdmin");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectsAdmins_ProjectId",
                table: "ProjectAdmin",
                newName: "IX_ProjectAdmin_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectAdmin",
                table: "ProjectAdmin",
                columns: new[] { "UserId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAdmin_Projects_ProjectId",
                table: "ProjectAdmin",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectAdmin_AspNetUsers_UserId",
                table: "ProjectAdmin",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
