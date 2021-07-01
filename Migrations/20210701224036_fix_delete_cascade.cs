using Microsoft.EntityFrameworkCore.Migrations;

namespace pawsitive.Migrations
{
    public partial class fix_delete_cascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ClientProfile_ClientProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_SpecialistProfile_SpecialistProfileId",
                table: "AspNetUsers");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ClientProfile_ClientProfileId",
                table: "AspNetUsers",
                column: "ClientProfileId",
                principalTable: "ClientProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_SpecialistProfile_SpecialistProfileId",
                table: "AspNetUsers",
                column: "SpecialistProfileId",
                principalTable: "SpecialistProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ClientProfile_ClientProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_SpecialistProfile_SpecialistProfileId",
                table: "AspNetUsers");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ClientProfile_ClientProfileId",
                table: "AspNetUsers",
                column: "ClientProfileId",
                principalTable: "ClientProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_SpecialistProfile_SpecialistProfileId",
                table: "AspNetUsers",
                column: "SpecialistProfileId",
                principalTable: "SpecialistProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
