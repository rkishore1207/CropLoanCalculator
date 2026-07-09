using CropLoan.Api.Attributes;
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
        private readonly ILogger<CropLoanController> _logger;

        public CropLoanController(ICropLoanProcessController cropLoanProcessController, ILogger<CropLoanController> logger)
        {
            _cropLoanProcessController = cropLoanProcessController;
            _logger = logger;
        }

        [HttpGet]
        [Route("page/{pageUID}/loans")]
        public async Task<IActionResult> GetLoansByPageUID(Guid pageUID)
        {
            _logger.LogInformation("Request received: GetLoansByPageUID for {PageUID}", pageUID);
            var loans = await _cropLoanProcessController.GetLoansByPageUID(pageUID);
            return Ok(loans);
        }

        [HttpPost]
        [RequireRole("Admin")]
        [Route("addOrUpdateLoan")]
        public async Task AddOrUpdateLoan([FromBody] CropLoanRequestModel cropLoanRequest)
        {
            _logger.LogInformation("Request received: AddOrUpdateLoan for {LoanUID}", cropLoanRequest.UID);
            await _cropLoanProcessController.AddOrUpdateLoan(cropLoanRequest);
        }

        [HttpPost]
        [Route("loansWithFilter")]
        public async Task<IActionResult> GetLoansWithFilter([FromBody] LoanFilterRequest request)
        {
            _logger.LogInformation("Request received: GetLoansWithFilter page {PageNumber} size {PageSize}", request.PageNumber, request.PageSize);
            var loans = await _cropLoanProcessController.GetLoansWithFilter(request);
            return Ok(loans);
        }

        [HttpGet]
        [RequireRole("Admin")]
        [Route("page/{pageUID}/generateExcel")]
        public async Task GenerateExcel(Guid pageUID)
        {
            _logger.LogInformation("Request received: GenerateExcel for {PageUID}", pageUID);
            await _cropLoanProcessController.GenerateExcelByPageUID(pageUID);
        }

        [HttpDelete]
        [RequireRole("Admin")]
        [Route("{loanUID}/deleteLoan")]
        public async Task DeleteLoan(Guid loanUID)
        {
            _logger.LogInformation("Request received: DeleteLoan for {LoanUID}", loanUID);
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
        [RequireRole("Admin")]
        [Route("addOrUpdatePage")]
        public async Task AddOrUpdatePage([FromBody] PageRequestModel pageRequest)
        {
            _logger.LogInformation("Request received: AddOrUpdatePage for {PageUID}", pageRequest.UID);
            await _cropLoanProcessController.AddOrUpdatePage(pageRequest);
        }

        [HttpDelete]
        [RequireRole("Admin")]
        [Route("{pageUID}/deletePage")]
        public async Task DeletePage(Guid pageUID)
        {
            _logger.LogInformation("Request received: DeletePage for {PageUID}", pageUID);
            await _cropLoanProcessController.DeletePage(pageUID);
        }
    }
}
