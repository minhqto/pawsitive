using Microsoft.EntityFrameworkCore.Migrations;

namespace pawsitive.Migrations
{
    public partial class Fix_Users : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_ClientId1",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_SpecialistId1",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingMessage_AspNetUsers_UserId1",
                table: "BookingMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_Dog_AspNetUsers_ClientId1",
                table: "Dog");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_AspNetUsers_ClientId1",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_AspNetUsers_SpecialistId1",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Service_AspNetUsers_SpecialistId1",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_SpecialistId1",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Review_ClientId1",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Review_SpecialistId1",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Dog_ClientId1",
                table: "Dog");

            migrationBuilder.DropIndex(
                name: "IX_BookingMessage_UserId1",
                table: "BookingMessage");

            migrationBuilder.DropIndex(
                name: "IX_Booking_ClientId1",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_SpecialistId1",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "SpecialistId",
                table: "SpecialistProfile");

            migrationBuilder.DropColumn(
                name: "SpecialistId1",
                table: "Service");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "SpecialistId1",
                table: "Review");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "Dog");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "BookingMessage");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "SpecialistId1",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Address");

            migrationBuilder.AlterColumn<string>(
                name: "SpecialistId",
                table: "Service",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "SpecialistId",
                table: "Review",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Review",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Dog",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "BookingMessage",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "SpecialistId",
                table: "Booking",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ClientId",
                table: "Booking",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Service_SpecialistId",
                table: "Service",
                column: "SpecialistId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_ClientId",
                table: "Review",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_SpecialistId",
                table: "Review",
                column: "SpecialistId");

            migrationBuilder.CreateIndex(
                name: "IX_Dog_ClientId",
                table: "Dog",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingMessage_UserId",
                table: "BookingMessage",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_ClientId",
                table: "Booking",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_SpecialistId",
                table: "Booking",
                column: "SpecialistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_ClientId",
                table: "Booking",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_SpecialistId",
                table: "Booking",
                column: "SpecialistId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BookingMessage_AspNetUsers_UserId",
                table: "BookingMessage",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Dog_AspNetUsers_ClientId",
                table: "Dog",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_AspNetUsers_ClientId",
                table: "Review",
                column: "ClientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_AspNetUsers_SpecialistId",
                table: "Review",
                column: "SpecialistId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Service_AspNetUsers_SpecialistId",
                table: "Service",
                column: "SpecialistId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_ClientId",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_Booking_AspNetUsers_SpecialistId",
                table: "Booking");

            migrationBuilder.DropForeignKey(
                name: "FK_BookingMessage_AspNetUsers_UserId",
                table: "BookingMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_Dog_AspNetUsers_ClientId",
                table: "Dog");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_AspNetUsers_ClientId",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_AspNetUsers_SpecialistId",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Service_AspNetUsers_SpecialistId",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Service_SpecialistId",
                table: "Service");

            migrationBuilder.DropIndex(
                name: "IX_Review_ClientId",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Review_SpecialistId",
                table: "Review");

            migrationBuilder.DropIndex(
                name: "IX_Dog_ClientId",
                table: "Dog");

            migrationBuilder.DropIndex(
                name: "IX_BookingMessage_UserId",
                table: "BookingMessage");

            migrationBuilder.DropIndex(
                name: "IX_Booking_ClientId",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_SpecialistId",
                table: "Booking");

            migrationBuilder.AddColumn<int>(
                name: "SpecialistId",
                table: "SpecialistProfile",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "SpecialistId",
                table: "Service",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecialistId1",
                table: "Service",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SpecialistId",
                table: "Review",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Review",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientId1",
                table: "Review",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecialistId1",
                table: "Review",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Dog",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientId1",
                table: "Dog",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "BookingMessage",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "BookingMessage",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SpecialistId",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClientId1",
                table: "Booking",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecialistId1",
                table: "Booking",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Address",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Service_SpecialistId1",
                table: "Service",
                column: "SpecialistId1");

            migrationBuilder.CreateIndex(
                name: "IX_Review_ClientId1",
                table: "Review",
                column: "ClientId1");

            migrationBuilder.CreateIndex(
                name: "IX_Review_SpecialistId1",
                table: "Review",
                column: "SpecialistId1");

            migrationBuilder.CreateIndex(
                name: "IX_Dog_ClientId1",
                table: "Dog",
                column: "ClientId1");

            migrationBuilder.CreateIndex(
                name: "IX_BookingMessage_UserId1",
                table: "BookingMessage",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_ClientId1",
                table: "Booking",
                column: "ClientId1");

            migrationBuilder.CreateIndex(
                name: "IX_Booking_SpecialistId1",
                table: "Booking",
                column: "SpecialistId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_ClientId1",
                table: "Booking",
                column: "ClientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_AspNetUsers_SpecialistId1",
                table: "Booking",
                column: "SpecialistId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BookingMessage_AspNetUsers_UserId1",
                table: "BookingMessage",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Dog_AspNetUsers_ClientId1",
                table: "Dog",
                column: "ClientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_AspNetUsers_ClientId1",
                table: "Review",
                column: "ClientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_AspNetUsers_SpecialistId1",
                table: "Review",
                column: "SpecialistId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Service_AspNetUsers_SpecialistId1",
                table: "Service",
                column: "SpecialistId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
