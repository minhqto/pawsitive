using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pawsitive.Migrations
{
    public partial class fixservicetype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "SpecialistProfileId",
                table: "ServiceType");

            migrationBuilder.DropColumn(
                name: "ServiceTypeId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "IdentityUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceTypeSpecialistProfile",
                columns: table => new
                {
                    ServiceTypesId = table.Column<int>(type: "int", nullable: false),
                    SpecialistProfilesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceTypeSpecialistProfile", x => new { x.ServiceTypesId, x.SpecialistProfilesId });
                    table.ForeignKey(
                        name: "FK_ServiceTypeSpecialistProfile_ServiceType_ServiceTypesId",
                        column: x => x.ServiceTypesId,
                        principalTable: "ServiceType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceTypeSpecialistProfile_SpecialistProfile_SpecialistProfilesId",
                        column: x => x.SpecialistProfilesId,
                        principalTable: "SpecialistProfile",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceTypeSpecialistProfile_SpecialistProfilesId",
                table: "ServiceTypeSpecialistProfile",
                column: "SpecialistProfilesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IdentityUser");

            migrationBuilder.DropTable(
                name: "ServiceTypeSpecialistProfile");

            migrationBuilder.AddColumn<int>(
                name: "SpecialistProfileId",
                table: "ServiceType",
                type: "int",
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
    }
}
