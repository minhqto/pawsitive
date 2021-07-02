using Microsoft.EntityFrameworkCore.Migrations;

namespace pawsitive.Migrations
{
    public partial class fix_client_profile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dog_AspNetUsers_ClientId",
                table: "Dog");

            migrationBuilder.DropForeignKey(
                name: "FK_Dog_ClientProfile_ClientProfileId",
                table: "Dog");

            migrationBuilder.DropIndex(
                name: "IX_Dog_ClientId",
                table: "Dog");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Dog");

            migrationBuilder.AlterColumn<int>(
                name: "ClientProfileId",
                table: "Dog",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Dog_ClientProfile_ClientProfileId",
                table: "Dog",
                column: "ClientProfileId",
                principalTable: "ClientProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dog_ClientProfile_ClientProfileId",
                table: "Dog");

            migrationBuilder.AlterColumn<int>(
                name: "ClientProfileId",
                table: "Dog",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "ClientId",
                table: "Dog",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dog_ClientId",
                table: "Dog",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dog_AspNetUsers_ClientId",
                table: "Dog",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Dog_ClientProfile_ClientProfileId",
                table: "Dog",
                column: "ClientProfileId",
                principalTable: "ClientProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
