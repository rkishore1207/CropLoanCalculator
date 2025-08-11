using CropLoan.Model.Entity;

namespace CropLoan.Data.Interface
{
    public interface ICropLoanRepository
    {
        Task<List<CropLoanEntityModel>> GetAllLoans();
        Task AddOrUpdateLoan(CropLoanEntityModel cropLoanEntity);
        Task DeleteLoan(Guid loanUID);
        Task<List<PageEntity>> GetPages();
        Task AddOrUpdatePage(PageEntity pageEntity);
        Task DeletePage(Guid pageUID);
    }
}
