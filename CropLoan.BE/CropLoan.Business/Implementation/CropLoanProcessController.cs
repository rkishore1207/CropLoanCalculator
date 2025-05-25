using AutoMapper;
using CropLoan.Business.Interface;
using CropLoan.Data.Interface;
using CropLoan.Model.Entity;
using CropLoan.Model.Request;
using CropLoan.Model.View;

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
        public async Task<List<CropLoanViewModel>> GetAllLoans()
        {
            var loans = await _cropLoanRepository.GetAllLoans();
            var loanViews = _mapper.Map<List<CropLoanViewModel>>(loans);
            return loanViews;
        }

        /// <summary>
        /// Saving Loan Request
        /// </summary>
        /// <param name="cropLoanRequest"></param>
        /// <returns></returns>
        public async Task SaveLoan(CropLoanRequestModel cropLoanRequest)
        {
            var cropEntity = _mapper.Map<CropLoanEntityModel>(cropLoanRequest);
            await _cropLoanRepository.SaveLoan(cropEntity);
        }
    }
}
