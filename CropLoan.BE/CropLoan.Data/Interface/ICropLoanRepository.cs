using CropLoan.Model.Entity;

namespace CropLoan.Data.Interface
{
    public interface ICropLoanRepository
    {
        Task<List<CropLoanEntityModel>> GetAllLoans();
        Task SaveLoan(CropLoanEntityModel cropLoanEntity);
    }
}
