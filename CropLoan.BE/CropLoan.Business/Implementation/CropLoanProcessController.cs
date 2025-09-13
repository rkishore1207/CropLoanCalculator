using AutoMapper;
using CropLoan.Business.Helper;
using CropLoan.Business.Interface;
using CropLoan.Data.Interface;
using CropLoan.Model.Entity;
using CropLoan.Model.Request;
using CropLoan.Model.View;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace CropLoan.Business.Implementation
{
    public class CropLoanProcessController : ICropLoanProcessController
    {
        private readonly ICropLoanRepository _cropLoanRepository;
        private readonly IMapper _mapper;

        #region CropLoanProcessController Constructor Declaration
        public CropLoanProcessController(ICropLoanRepository cropLoanRepository, IMapper mapper)
        {
            _cropLoanRepository = cropLoanRepository;
            _mapper = mapper;
        }
        #endregion

        /// <summary>
        /// Getting all loans
        /// </summary>
        /// <returns>List of Loans</returns>
        public async Task<List<CropLoanViewModel>> GetLoansByPageUID(Guid pageUID)
        {
            var loans = await _cropLoanRepository.GetLoansByPageUID(pageUID);
            var loanViews = _mapper.Map<List<CropLoanViewModel>>(loans.OrderByDescending(x => x.CreatedOn));
            return loanViews;
        }

        /// <summary>
        /// Adding or Updating Loan Request
        /// </summary>
        /// <param name="pageRequest"></param>
        /// <returns></returns>
        public async Task AddOrUpdateLoan(CropLoanRequestModel pageRequest)
        {
            var cropEntity = _mapper.Map<CropLoanEntityModel>(pageRequest);
            await _cropLoanRepository.AddOrUpdateLoan(cropEntity);
        }

        /// <summary>
        /// Getting Loans with Filter
        /// </summary>
        /// <param name="filterRequest"></param>
        /// <returns></returns>
        public async Task<List<CropLoanViewModel>> GetLoansWithFilter(LoanFilterRequest filterRequest)
        {
            var context = new ValidationContext(filterRequest.Date, serviceProvider: null, items: null);
            var results = new List<ValidationResult>();
            bool isValidDate = Validator.TryValidateObject(filterRequest.Date, context, results, validateAllProperties: true);

            var loans = await _cropLoanRepository.GetLoansByPageUID(Guid.Empty);
            var filteredLoans = loans;

            if (isValidDate)
                filteredLoans = filteredLoans.Where(x => x.CreatedOn >= filterRequest.Date.FromDate && x.CreatedOn <= filterRequest.Date.ToDate).ToList();

            if (filterRequest.CropTypeId != 0)
                filteredLoans = filteredLoans.Where(x => x.CropTypeId == filterRequest.CropTypeId).ToList();

            if (filterRequest.FarmerTypeId != 0)
                filteredLoans = filteredLoans.Where(x => x.FarmerTypeId == filterRequest.FarmerTypeId).ToList();

            var loanViews = _mapper.Map<List<CropLoanViewModel>>(filteredLoans.OrderByDescending(x => x.CreatedOn));
            return loanViews;
        }

        /// <summary>
        /// Generating Excel
        /// </summary>
        /// <param name="Generating Excel"></param>
        /// <returns></returns>
        public async Task GenerateExcelByPageUID(Guid pageUID)
        {
            string timestamp = DateTime.Now.ToString("dd-MM-yyyy HH-mm-ss");
            string fileName = $"D:\\Exports\\{timestamp}-Loans.xlsx";
            Directory.CreateDirectory(Path.GetDirectoryName(fileName));

            var loans = await _cropLoanRepository.GetLoansByPageUID(pageUID);
            loans = loans.OrderBy(x => x.CreatedOn).ToList();
            var workBookOpenXml = new WorkbookOpenXML();
            workBookOpenXml.ExportToExcel(loans, fileName);
        }

        /// <summary>
        /// Deleting Loan By UID
        /// </summary>
        /// <returns>Loan UID</returns>
        public async Task DeleteLoan(Guid loanUID)
        {
            await _cropLoanRepository.DeleteLoan(loanUID);
        }

        /// <summary>
        /// Getting all Pages
        /// </summary>
        /// <returns>List of Pages</returns>
        public async Task<List<PageViewModel>> GetPages()
        {
            var pages = await _cropLoanRepository.GetPages();
            var pageViews = _mapper.Map<List<PageViewModel>>(pages.OrderByDescending(x => x.CreatedOn));
            return pageViews;
        }

        /// <summary>
        /// Adding or Updating Page Request
        /// </summary>
        /// <param name="pageRequest"></param>
        /// <returns></returns>
        public async Task AddOrUpdatePage(PageRequestModel pageRequest)
        {
            var pages = await _cropLoanRepository.GetPages();
            var isNameExists = pages?.Any(x => x.Name.ToLower() == pageRequest.Name.ToLower()) ?? false;
            if (isNameExists)            
                throw new BusinessException("ERR_DUPLICATE_NAME", "Page name already exists");
            var pageEntity = _mapper.Map<PageEntity>(pageRequest);
            await _cropLoanRepository.AddOrUpdatePage(pageEntity);
        }

        /// <summary>
        /// Deleting Page
        /// </summary>
        /// <returns>PageUID</returns>
        public async Task DeletePage(Guid pageUID)
        {
            await _cropLoanRepository.DeletePage(pageUID);
        }
    }
}
