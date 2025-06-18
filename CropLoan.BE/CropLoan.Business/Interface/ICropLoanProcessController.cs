using CropLoan.Model.Request;
using CropLoan.Model.View;

namespace CropLoan.Business.Interface
{
    public interface ICropLoanProcessController
    {
        Task<List<CropLoanViewModel>> GetAllLoans();
        Task AddOrUpdateLoan(CropLoanRequestModel cropLoanRequest);
        Task<List<CropLoanViewModel>> GetLoansWithFilter(LoanFilterRequest filterRequest);
        Task GenerateExcel();
        Task DeleteLoan(Guid loanUID);
    }
}
