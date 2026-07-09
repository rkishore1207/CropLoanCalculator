using AutoMapper;
using CropLoan.Business.Helper;
using CropLoan.Business.Interface;
using CropLoan.Data.Interface;
using CropLoan.Model.Entity;
using CropLoan.Model.Request;
using CropLoan.Model.View;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace CropLoan.Business.Implementation
{
    public class CropLoanProcessController : ICropLoanProcessController
    {
        private readonly ICropLoanRepository _cropLoanRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CropLoanProcessController> _logger;

        #region CropLoanProcessController Constructor Declaration
        public CropLoanProcessController(ICropLoanRepository cropLoanRepository, IMapper mapper, ILogger<CropLoanProcessController> logger)
        {
            _cropLoanRepository = cropLoanRepository;
            _mapper = mapper;
            _logger = logger;
        }
        #endregion

        /// <summary>
        /// Getting all loans
        /// </summary>
        /// <returns>List of Loans</returns>
        public async Task<List<CropLoanViewModel>> GetLoansByPageUID(Guid pageUID)
        {
            _logger.LogInformation("Getting loans by page uid {PageUID}", pageUID);
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
            _logger.LogInformation("Add or update loan requested for uid {LoanUID}", pageRequest.UID);
            var cropEntity = _mapper.Map<CropLoanEntityModel>(pageRequest);
            await _cropLoanRepository.AddOrUpdateLoan(cropEntity);
        }

        /// <summary>
        /// Getting Loans with Filter
        /// </summary>
        /// <param name="filterRequest"></param>
        /// <returns></returns>
        public async Task<PagedResult<CropLoanViewModel>> GetLoansWithFilter(LoanFilterRequest filterRequest)
        {
            _logger.LogInformation("Getting filtered loans with page {PageNumber} and size {PageSize}", filterRequest.PageNumber, filterRequest.PageSize);

            var loans = await _cropLoanRepository.GetLoansByPageUID(Guid.Empty);
            var filteredLoans = loans;

            if (filterRequest.Date?.FromDate.HasValue == true && filterRequest.Date?.ToDate.HasValue == true)
                filteredLoans = filteredLoans.Where(x => x.CreatedOn >= filterRequest.Date.FromDate && x.CreatedOn <= filterRequest.Date.ToDate).ToList();

            if (filterRequest.CropTypeId != 0)
                filteredLoans = filteredLoans.Where(x => x.CropTypeId == filterRequest.CropTypeId).ToList();

            if (filterRequest.FarmerTypeId != 0)
                filteredLoans = filteredLoans.Where(x => x.FarmerTypeId == filterRequest.FarmerTypeId).ToList();

            var orderedLoans = filteredLoans.OrderByDescending(x => x.CreatedOn).ToList();
            var totalCount = orderedLoans.Count;
            var pageNumber = filterRequest.PageNumber < 1 ? 1 : filterRequest.PageNumber;
            var pageSize = filterRequest.PageSize < 1 ? 10 : filterRequest.PageSize;
            var totalPages = totalCount == 0 ? 0 : (int)Math.Ceiling(totalCount / (double)pageSize);

            var pagedLoans = orderedLoans
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var loanViews = _mapper.Map<List<CropLoanViewModel>>(pagedLoans);

            return new PagedResult<CropLoanViewModel>
            {
                Items = loanViews,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalPages = totalPages
            };
        }

        /// <summary>
        /// Generating Excel
        /// </summary>
        /// <param name="Generating Excel"></param>
        /// <returns></returns>
        public async Task GenerateExcelByPageUID(Guid pageUID)
        {
            _logger.LogInformation("Generating excel for page uid {PageUID}", pageUID);
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
            _logger.LogInformation("Deleting loan uid {LoanUID}", loanUID);
            await _cropLoanRepository.DeleteLoan(loanUID);
        }

        /// <summary>
        /// Getting all Pages
        /// </summary>
        /// <returns>List of Pages</returns>
        public async Task<List<PageViewModel>> GetPages()
        {
            _logger.LogInformation("Getting pages");
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
            _logger.LogInformation("Add or update page requested for uid {PageUID}", pageRequest.UID);
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
            _logger.LogInformation("Deleting page uid {PageUID}", pageUID);
            await _cropLoanRepository.DeletePage(pageUID);
        }
    }
}
