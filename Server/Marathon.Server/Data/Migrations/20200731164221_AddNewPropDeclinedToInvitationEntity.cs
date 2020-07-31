namespace Marathon.Server.Data.Migrations
{
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class AddNewPropDeclinedToInvitationEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Declined",
                table: "Invitations",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Declined",
                table: "Invitations");
        }
    }
}
