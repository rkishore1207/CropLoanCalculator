namespace CropLoan.Model.View
{
    public class BusinessException: Exception
    {
        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }

        public BusinessException(string errorCode, string errorMessage) : base(errorMessage)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
        }
    }
}
