using CropLoan.Data.Interface;
using CropLoan.Model.Dto;
using CropLoan.Model.Entity;
using CropLoan.Utility.Configuration;
using System.Data;

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
        public async Task AddOrUpdateLoan(CropLoanEntityModel cropLoanEntity)
        {
            var uidParam = SpParameter.Create("uid", cropLoanEntity.UID, ParameterDirection.Input, SqlDbType.UniqueIdentifier);
            var registerNumberParam = SpParameter.Create("RegisterNumber", cropLoanEntity.RegisterNumber, ParameterDirection.Input, SqlDbType.NVarChar);
            var nameParam = SpParameter.Create("Name", cropLoanEntity.CustomerName, ParameterDirection.Input, SqlDbType.NVarChar);
            var loanNumberParam = SpParameter.Create("LoanNumber", cropLoanEntity.LoanNumber, ParameterDirection.Input, SqlDbType.NVarChar);
            var accountNumberParam = SpParameter.Create("AccountNumber", cropLoanEntity.AccountNumber, ParameterDirection.Input, SqlDbType.NVarChar);
            var cropTypeParam = SpParameter.Create("CropTypeId", cropLoanEntity.CropTypeId, ParameterDirection.Input, SqlDbType.Int);
            var farmerTypeParam = SpParameter.Create("FarmerTypeId", cropLoanEntity.FarmerTypeId, ParameterDirection.Input, SqlDbType.Int);
            var acreParam = SpParameter.Create("Acre", cropLoanEntity.Acre, ParameterDirection.Input, SqlDbType.Decimal);
            var fertilizerParam = SpParameter.Create("Fertilizer", cropLoanEntity.Fertilizer, ParameterDirection.Input, SqlDbType.Decimal);
            var seedParam = SpParameter.Create("Seed", cropLoanEntity.Seed, ParameterDirection.Input, SqlDbType.Decimal);
            var insecticideParam = SpParameter.Create("Insecticide", cropLoanEntity.Insecticide, ParameterDirection.Input, SqlDbType.Decimal);
            var thozhuUram = SpParameter.Create("ThozhuUram", cropLoanEntity.ThozhuUram, ParameterDirection.Input, SqlDbType.Decimal);
            var readyCashParam = SpParameter.Create("ReadyCash", cropLoanEntity.ReadyCash, ParameterDirection.Input, SqlDbType.Decimal);
            var grandTotalParam = SpParameter.Create("GrandTotal", cropLoanEntity.GrandTotal, ParameterDirection.Input, SqlDbType.Decimal);
            var totalParam = SpParameter.Create("Total", cropLoanEntity.TotalAmount, ParameterDirection.Input, SqlDbType.Decimal);
            await ExecuteStoredProcedureNonQueryAsync("[dbo].[AddOrUpdateLoan]",uidParam, registerNumberParam, nameParam, loanNumberParam, accountNumberParam, cropTypeParam, farmerTypeParam, acreParam, fertilizerParam, seedParam, insecticideParam, thozhuUram, readyCashParam, grandTotalParam, totalParam);
        }

        /// <summary>
        /// Deleting the loan by UID
        /// </summary>
        /// <returns>Loan UID</returns>
        public async Task DeleteLoan(Guid loanUID)
        {
            var uidParam = SpParameter.Create("LoanUID", loanUID, ParameterDirection.Input, SqlDbType.UniqueIdentifier);
            await ExecuteStoredProcedureNonQueryAsync("[dbo].[DeleteLoan]", uidParam);
        }

        /// <summary>
        /// Getting all saved Pages
        /// </summary>
        /// <returns>List of Page Entities</returns>
        public async Task<List<PageEntity>> GetPages()
        {
            var pages = await ExecuteStoredProcedureAsync<PageEntity>("[dbo].[GetPages]");
            return pages;
        }

        /// <summary>
        /// Saving the Page Entry
        /// </summary>
        /// <returns></returns>
        public async Task AddOrUpdatePage(PageEntity pageEntity)
        {
            var uidParam = SpParameter.Create("UID", pageEntity.UID, ParameterDirection.Input, SqlDbType.UniqueIdentifier);
            var nameParam = SpParameter.Create("Name", pageEntity.Name, ParameterDirection.Input, SqlDbType.NVarChar);            
            await ExecuteStoredProcedureNonQueryAsync("[dbo].[AddOrUpdatePage]", uidParam, nameParam);
        }

        /// <summary>
        /// Deleting the Page records
        /// </summary>
        /// <returns>Loan UID</returns>
        public async Task DeletePage(Guid pageUID)
        {
            var uidParam = SpParameter.Create("PageUID", pageUID, ParameterDirection.Input, SqlDbType.UniqueIdentifier);
            await ExecuteStoredProcedureNonQueryAsync("[dbo].[DeletePageData]", uidParam);
        }
    }
}
