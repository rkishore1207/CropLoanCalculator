using System.ComponentModel.DataAnnotations;

namespace CropLoan.Model.Request
{
    public class CropLoanRequestModel
    {
        public Guid UID { get; set; }
        public Guid PageUID { get; set; }

        [Required]
        [StringLength(50)]
        public string RegisterNumber { get; set; }

        [Required]
        [StringLength(150)]
        public string CustomerName { get; set; }

        [Required]
        [StringLength(50)]
        public string LoanNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string AccountNumber { get; set; }

        [Range(1, int.MaxValue)]
        public int CropTypeId { get; set; }
        public string CropType { get; set; }

        [Range(1, int.MaxValue)]
        public int FarmerTypeId { get; set; }
        public string FarmerType { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Acre { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Fertilizer { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Seed { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Insecticide { get; set; }

        [Range(0, double.MaxValue)]
        public decimal ThozhuUram { get; set; }

        [Range(0, double.MaxValue)]
        public decimal ReadyCash { get; set; }

        [Range(0, double.MaxValue)]
        public decimal GrandTotal { get; set; }

        [Range(0, double.MaxValue)]
        public decimal TotalAmount { get; set; }
    }
}
