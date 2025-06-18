using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml;
using CropLoan.Model.Entity;
using DocumentFormat.OpenXml.Packaging;

namespace CropLoan.Business.Helper
{
    public class WorkbookOpenXML
    {
        public void ExportToExcel(List<CropLoanEntityModel> loans, string filePath)
        {
            using (SpreadsheetDocument document = SpreadsheetDocument.Create(filePath, SpreadsheetDocumentType.Workbook))
            {
                // Create Workbook
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();

                // Create Worksheet
                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                SheetData sheetData = new SheetData();
                var ws = new Worksheet();

                // Custom Column
                Columns columns = new Columns(
                    new Column { Min = 1, Max = 1, Width = 20d, CustomWidth = true },
                    new Column { Min = 2, Max = 2, Width = 33d, CustomWidth = true },
                    new Column { Min = 3, Max = 3, Width = 15d, CustomWidth = true },
                    new Column { Min = 4, Max = 4, Width = 25d, CustomWidth = true },
                    new Column { Min = 5, Max = 5, Width = 15d, CustomWidth = true },
                    new Column { Min = 6, Max = 6, Width = 15d, CustomWidth = true },
                    new Column { Min = 7, Max = 7, Width = 15d, CustomWidth = true },
                    new Column { Min = 8, Max = 8, Width = 15d, CustomWidth = true },
                    new Column { Min = 9, Max = 9, Width = 15d, CustomWidth = true },
                    new Column { Min = 10, Max = 10, Width = 15d, CustomWidth = true },
                    new Column { Min = 11, Max = 11, Width = 15d, CustomWidth = true },
                    new Column { Min = 12, Max = 12, Width = 15d, CustomWidth = true },
                    new Column { Min = 13, Max = 13, Width = 15d, CustomWidth = true }
                );
                ws.Append(columns);
                ws.Append(sheetData);
                worksheetPart.Worksheet = ws;


                // Create Sheets
                Sheets sheets = document.WorkbookPart.Workbook.AppendChild(new Sheets());
                Sheet sheet = new Sheet()
                {
                    Id = document.WorkbookPart.GetIdOfPart(worksheetPart),
                    SheetId = 1,
                    Name = "Loans"
                };
                sheets.Append(sheet);

                // Header Row
                Row headerRow = new Row();
                headerRow.Append(
                    ConstructCell("Member Number", CellValues.String),
                    ConstructCell("Name", CellValues.String),
                    ConstructCell("Loan Number", CellValues.String),
                    ConstructCell("Farmer Type", CellValues.String),
                    ConstructCell("Crop Type", CellValues.String),
                    ConstructCell("Acre", CellValues.String),
                    ConstructCell("Ready Cash", CellValues.String),
                    ConstructCell("Fertilizer", CellValues.String),
                    ConstructCell("Insecticide", CellValues.String),
                    ConstructCell("Seed", CellValues.String),
                    ConstructCell("Thozhu Uram", CellValues.String),
                    ConstructCell("Grand Total", CellValues.String),
                    ConstructCell("Total", CellValues.String)
                );
                sheetData.AppendChild(headerRow);

                // Data Rows
                foreach (var loan in loans)
                {
                    Row dataRow = new Row();
                    dataRow.Append(
                        ConstructCell(loan.RegisterNumber.ToString(), CellValues.Number),
                        ConstructCell(loan.CustomerName, CellValues.String),
                        ConstructCell(loan.LoanNumber, CellValues.String),
                        ConstructCell(loan.FarmerType, CellValues.String),
                        ConstructCell(loan.CropTypeName, CellValues.String),
                        ConstructCell(loan.Acre.ToString(), CellValues.String),
                        ConstructCell(loan.ReadyCash.ToString(), CellValues.String),
                        ConstructCell(loan.Fertilizer.ToString(), CellValues.String),
                        ConstructCell(loan.Insecticide.ToString(), CellValues.String),
                        ConstructCell(loan.Seed.ToString(), CellValues.String),
                        ConstructCell(loan.ThozhuUram.ToString(), CellValues.String),
                        ConstructCell(loan.GrandTotal.ToString(), CellValues.String),
                        ConstructCell(loan.TotalAmount.ToString(), CellValues.String)
                    );
                    sheetData.AppendChild(dataRow);
                }

                workbookPart.Workbook.Save();
            }
        }

        private Cell ConstructCell(string value, CellValues dataType)
        {
            return new Cell()
            {
                CellValue = new CellValue(value),
                DataType = new EnumValue<CellValues>(dataType)
            };
        }
    }
}
