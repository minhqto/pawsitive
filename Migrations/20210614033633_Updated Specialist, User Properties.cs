using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pawsitive.Migrations
{
    public partial class UpdatedSpecialistUserProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceTypeUser");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "SpecialistProfile",
                newName: "BusinessName");

            migrationBuilder.AddColumn<string>(
                name: "AboutMe",
                table: "SpecialistProfile",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ProvideHomeVisitService",
                table: "SpecialistProfile",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "SpecialistProfileId",
                table: "ServiceType",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "ProfileImage",
                table: "AspNetUsers",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileImageContentType",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServiceTypeId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ServiceType_SpecialistProfileId",
                table: "ServiceType",
                column: "SpecialistProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ServiceTypeId",
                table: "AspNetUsers",
                column: "ServiceTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ServiceType_ServiceTypeId",
                table: "AspNetUsers",
                column: "ServiceTypeId",
                principalTable: "ServiceType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceType_SpecialistProfile_SpecialistProfileId",
                table: "ServiceType",
                column: "SpecialistProfileId",
                principalTable: "SpecialistProfile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ServiceType_ServiceTypeId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceType_SpecialistProfile_SpecialistProfileId",
                table: "ServiceType");

            migrationBuilder.DropIndex(
                name: "IX_ServiceType_SpecialistProfileId",
                table: "ServiceType");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ServiceTypeId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AboutMe",
                table: "SpecialistProfile");

            migrationBuilder.DropColumn(
                name: "ProvideHomeVisitService",
                table: "SpecialistProfile");

            migrationBuilder.DropColumn(
                name: "SpecialistProfileId",
                table: "ServiceType");

            migrationBuilder.DropColumn(
                name: "ProfileImage",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ProfileImageContentType",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ServiceTypeId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "BusinessName",
                table: "SpecialistProfile",
                newName: "Description");

            migrationBuilder.CreateTable(
                name: "ServiceTypeUser",
                columns: table => new
                {
                    ServiceTypesId = table.Column<int>(type: "int", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceTypeUser", x => new { x.ServiceTypesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ServiceTypeUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceTypeUser_ServiceType_ServiceTypesId",
                        column: x => x.ServiceTypesId,
                        principalTable: "ServiceType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceTypeUser_UsersId",
                table: "ServiceTypeUser",
                column: "UsersId");
        }
    }
}
