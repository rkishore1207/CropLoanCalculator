using CropLoan.Model.Request;
using CropLoan.Model.View;

namespace CropLoan.Business.Interface
{
    public interface ICropLoanProcessController
    {
        Task<List<CropLoanViewModel>> GetLoansByPageUID(Guid pageUID);
        Task AddOrUpdateLoan(CropLoanRequestModel cropLoanRequest);
        Task<List<CropLoanViewModel>> GetLoansWithFilter(LoanFilterRequest filterRequest);
        Task GenerateExcelByPageUID(Guid pageUID);
        Task DeleteLoan(Guid loanUID);
        Task<List<PageViewModel>> GetPages();
        Task AddOrUpdatePage(PageRequestModel pageRequest);
        Task DeletePage(Guid pageUID);
    }
}
