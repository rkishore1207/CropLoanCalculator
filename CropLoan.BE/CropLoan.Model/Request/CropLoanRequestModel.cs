namespace CropLoan.Model.Request
{
    public class CropLoanRequestModel
    {
        public Guid UID { get; set; }
        public Guid PageUID { get; set; }
        public string RegisterNumber { get; set; }
        public string CustomerName { get; set; }
        public string LoanNumber { get; set; }
        public string AccountNumber { get; set; }
        public int CropTypeId { get; set; }
        public string CropType { get; set; }
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
