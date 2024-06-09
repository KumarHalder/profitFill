using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_profitFill.Migrations
{
    /// <inheritdoc />
    public partial class schema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "profitFill");

            migrationBuilder.RenameTable(
                name: "job",
                newName: "job",
                newSchema: "profitFill");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "job",
                schema: "profitFill",
                newName: "job");
        }
    }
}
