namespace CropLoan.Model.View
{
    public class CropLoanViewModel
    {
        public Guid UID { get; set; }
        public string RegisterNumber { get; set; }
        public string CustomerName { get; set; }
        public string LoanNumber { get; set; }
        public int CropTypeId { get; set; }
        public string CropTypeName { get; set; }
        public int FarmerTypeId { get; set; }
        public string FarmerType { get; set; }
        public decimal Acre { get; set; }
        public decimal Fertilizer { get; set; }
        public decimal Seed { get; set; }
        public decimal Insecticide { get; set; }
        public decimal ThozhuUram { get; set; }
        public decimal ReadyCash { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
