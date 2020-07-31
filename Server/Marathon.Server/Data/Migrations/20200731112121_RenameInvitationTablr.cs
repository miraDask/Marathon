namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class RenameInvitationTablr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitation_Projects_ProjectId",
                table: "Invitation");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitation_Teams_TeamId",
                table: "Invitation");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitation_AspNetUsers_РecipientId",
                table: "Invitation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitation",
                table: "Invitation");

            migrationBuilder.DropIndex(
                name: "IX_Invitation_РecipientId",
                table: "Invitation");

            migrationBuilder.DropColumn(
                name: "РecipientId",
                table: "Invitation");

            migrationBuilder.RenameTable(
                name: "Invitation",
                newName: "Invitations");

            migrationBuilder.RenameIndex(
                name: "IX_Invitation_TeamId",
                table: "Invitations",
                newName: "IX_Invitations_TeamId");

            migrationBuilder.RenameIndex(
                name: "IX_Invitation_ProjectId",
                table: "Invitations",
                newName: "IX_Invitations_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Invitation_IsDeleted",
                table: "Invitations",
                newName: "IX_Invitations_IsDeleted");

            migrationBuilder.AddColumn<string>(
                name: "RecipientId",
                table: "Invitations",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_RecipientId",
                table: "Invitations",
                column: "RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Projects_ProjectId",
                table: "Invitations",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_AspNetUsers_RecipientId",
                table: "Invitations",
                column: "RecipientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Teams_TeamId",
                table: "Invitations",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Projects_ProjectId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_AspNetUsers_RecipientId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Teams_TeamId",
                table: "Invitations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Invitations",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_RecipientId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "RecipientId",
                table: "Invitations");

            migrationBuilder.RenameTable(
                name: "Invitations",
                newName: "Invitation");

            migrationBuilder.RenameIndex(
                name: "IX_Invitations_TeamId",
                table: "Invitation",
                newName: "IX_Invitation_TeamId");

            migrationBuilder.RenameIndex(
                name: "IX_Invitations_ProjectId",
                table: "Invitation",
                newName: "IX_Invitation_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Invitations_IsDeleted",
                table: "Invitation",
                newName: "IX_Invitation_IsDeleted");

            migrationBuilder.AddColumn<string>(
                name: "РecipientId",
                table: "Invitation",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Invitation",
                table: "Invitation",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Invitation_РecipientId",
                table: "Invitation",
                column: "РecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitation_Projects_ProjectId",
                table: "Invitation",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitation_Teams_TeamId",
                table: "Invitation",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitation_AspNetUsers_РecipientId",
                table: "Invitation",
                column: "РecipientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
