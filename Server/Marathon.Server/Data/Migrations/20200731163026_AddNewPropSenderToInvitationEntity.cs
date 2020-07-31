namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddNewPropSenderToInvitationEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SenderId",
                table: "Invitations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_SenderId",
                table: "Invitations",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_AspNetUsers_SenderId",
                table: "Invitations",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_AspNetUsers_SenderId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_SenderId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "SenderId",
                table: "Invitations");
        }
    }
}
