using CropLoan.Business.Interface;
using CropLoan.Model.Request;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CropLoan.Api.Controllers
{
    [ApiController]
    [Route("api/cropLoan")]
    [EnableCors("ReactCORS")]
    public class CropLoanController : ControllerBase
    {
        private readonly ICropLoanProcessController _cropLoanProcessController;

        public CropLoanController(ICropLoanProcessController cropLoanProcessController)
        {
            _cropLoanProcessController = cropLoanProcessController;
        }

        [HttpGet]
        [Route("loans")]
        public async Task<IActionResult> GetAllLoans()
        {
            var loans = await _cropLoanProcessController.GetAllLoans();
            return Ok(loans);
        }

        [HttpPost]
        [Route("addOrUpdateLoan")]
        public async Task AddOrUpdateLoan([FromBody] CropLoanRequestModel cropLoanRequest)
        {
            await _cropLoanProcessController.AddOrUpdateLoan(cropLoanRequest);
        }

        [HttpPost]
        [Route("loansWithFilter")]
        public async Task<IActionResult> GetLoansWithFilter([FromBody] LoanFilterRequest request)
        {
            var loans = await _cropLoanProcessController.GetLoansWithFilter(request);
            return Ok(loans);
        }

        [HttpGet]
        [Route("generateExcel")]
        public async Task GenerateExcel()
        {
            await _cropLoanProcessController.GenerateExcel();
        }

        [HttpDelete]
        [Route("{loanUID}/deleteLoan")]
        public async Task DeleteLoan(Guid loanUID)
        {
            await _cropLoanProcessController.DeleteLoan(loanUID);
        }

        [HttpGet]
        [Route("pages")]
        public async Task<IActionResult> GetPages()
        {
            var pages = await _cropLoanProcessController.GetPages();
            return Ok(pages);
        }

        [HttpPost]
        [Route("addOrUpdatePage")]
        public async Task AddOrUpdatePage([FromBody] PageRequestModel pageRequest)
        {
            await _cropLoanProcessController.AddOrUpdatePage(pageRequest);
        }

        [HttpDelete]
        [Route("{pageUID}/deletePage")]
        public async Task DeletePage(Guid pageUID)
        {
            await _cropLoanProcessController.DeletePage(pageUID);
        }
    }
}
