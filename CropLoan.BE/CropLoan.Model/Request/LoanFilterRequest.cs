using CropLoan.Model.Validations;

namespace CropLoan.Model.Request
{
    public class LoanFilterRequest
    {
        public DateFilter Date { get; set; }
        public int CropTypeId { get; set; }
        public int FarmerTypeId { get; set; }
    }

    [DateFilterValidation]
    public class DateFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
