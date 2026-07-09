using CropLoan.Model.Validations;
using System.ComponentModel.DataAnnotations;

namespace CropLoan.Model.Request
{
    public class LoanFilterRequest
    {
        [Required]
        public DateFilter Date { get; set; }
        public int CropTypeId { get; set; }
        public int FarmerTypeId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "PageNumber must be greater than 0")]
        public int PageNumber { get; set; } = 1;

        [Range(1, 200, ErrorMessage = "PageSize must be between 1 and 200")]
        public int PageSize { get; set; } = 10;
    }

    [DateFilterValidation]
    public class DateFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
