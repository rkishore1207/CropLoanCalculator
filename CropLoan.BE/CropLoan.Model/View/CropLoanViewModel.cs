using CropLoan.Utility.Enums;

namespace CropLoan.Model.View
{
    public class CropLoanViewModel
    {
        public string RegisterNumber { get; set; }
        public string CustomerName { get; set; }
        public string LoanNumber { get; set; }
        public CropType CropType { get; set; }
        public FarmerType FarmerType { get; set; }
        public decimal Acre { get; set; }
        public decimal Fertilizer { get; set; }
        public decimal Seed { get; set; }
        public decimal Insecticide { get; set; }
        public decimal ThozhuUram { get; set; }
        public decimal ReadyCash { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal Total { get; set; }
    }
}
