using CropLoan.Model.Request;
using CropLoan.Model.View;

namespace CropLoan.Business.Interface
{
    public interface ICropLoanProcessController
    {
        Task<List<CropLoanViewModel>> GetAllLoans();
        Task SaveLoan(CropLoanRequestModel cropLoanRequest);
    }
}
