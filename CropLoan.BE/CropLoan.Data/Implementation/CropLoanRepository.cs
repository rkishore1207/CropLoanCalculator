using CropLoan.Data.Interface;
using CropLoan.Model.Entity;
using CropLoan.Utility.Configuration;

namespace CropLoan.Data.Implementation
{
    public class CropLoanRepository : BaseRepo, ICropLoanRepository
    {
        #region Constructor Declaration for CropLoanRepository
        public CropLoanRepository(IConfigurationService configuration) : base(configuration)
        {
        }
        #endregion

        /// <summary>
        /// Getting all saved crop loans
        /// </summary>
        /// <returns>List of Loan Entities</returns>
        public async Task<List<CropLoanEntityModel>> GetAllLoans()
        {
            var loans = await ExecuteStoredProcedureAsync<CropLoanEntityModel>("[dbo].[GetAllLoans]");
            return loans;
        }

        /// <summary>
        /// Saving the Loan Entry
        /// </summary>
        /// <returns></returns>
        public async Task SaveLoan(CropLoanEntityModel cropLoanEntity)
        {
            await ExecuteStoredProcedureNonQueryAsync("[dbo].[SaveLoan]");
        }
    }
}
