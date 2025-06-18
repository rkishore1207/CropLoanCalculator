using CropLoan.Model.Request;
using System.ComponentModel.DataAnnotations;

namespace CropLoan.Model.Validations
{
    public class DateFilterValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var model = value as DateFilter;
            if(!model.FromDate.HasValue || !model.ToDate.HasValue)
            {
                ErrorMessage = "FromDate and ToDate Should be Required";
                return false;
            }
            else if (model.FromDate > model.ToDate)
            {
                ErrorMessage = "FromDate should be Less Than ToDate";
                return false;
            }
            return true;
        }
    }
}
