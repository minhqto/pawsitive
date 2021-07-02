using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pawsitive.Migrations
{
    public partial class add_client_profile_entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IdentityUser");

            migrationBuilder.AddColumn<string>(
                name: "AboutDog",
                table: "Dog",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientProfileId",
                table: "Dog",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DogSex",
                table: "Dog",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Dog",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientProfileId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ClientProfile",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AboutMe = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientProfile", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dog_ClientProfileId",
                table: "Dog",
                column: "ClientProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ClientProfileId",
                table: "AspNetUsers",
                column: "ClientProfileId",
                unique: true,
                filter: "[ClientProfileId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ClientProfile_ClientProfileId",
                table: "AspNetUsers",
                column: "ClientProfileId",
                principalTable: "ClientProfile",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ClientProfile_ClientProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Dog_ClientProfile_ClientProfileId",
                table: "Dog");

            migrationBuilder.DropTable(
                name: "ClientProfile");

            migrationBuilder.DropIndex(
                name: "IX_Dog_ClientProfileId",
                table: "Dog");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ClientProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AboutDog",
                table: "Dog");

            migrationBuilder.DropColumn(
                name: "ClientProfileId",
                table: "Dog");

            migrationBuilder.DropColumn(
                name: "DogSex",
                table: "Dog");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Dog");

            migrationBuilder.DropColumn(
                name: "ClientProfileId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "IdentityUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IdentityUser", x => x.Id);
                });
        }
    }
}
