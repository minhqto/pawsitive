using Microsoft.EntityFrameworkCore.Migrations;

namespace pawsitive.Migrations
{
    public partial class modified_service : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Service_SpecialistProfile_SpecialistProfileId",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_SpecialistProfileId",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "SpecialistProfileId",
                table: "Service");

            migrationBuilder.AddColumn<int>(
                name: "SpecialistId",
                table: "Service",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Service_SpecialistId",
                table: "Service",
                column: "SpecialistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Service_SpecialistProfile_SpecialistId",
                table: "Service",
                column: "SpecialistId",
                principalTable: "SpecialistProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Service_SpecialistProfile_SpecialistId",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_SpecialistId",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "SpecialistId",
                table: "Service");

            migrationBuilder.AddColumn<int>(
                name: "SpecialistProfileId",
                table: "Service",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Service_SpecialistProfileId",
                table: "Service",
                column: "SpecialistProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Service_SpecialistProfile_SpecialistProfileId",
                table: "Service",
                column: "SpecialistProfileId",
                principalTable: "SpecialistProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
