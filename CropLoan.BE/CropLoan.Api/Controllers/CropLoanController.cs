using CropLoan.Business.Interface;
using CropLoan.Model.Request;
using Microsoft.AspNetCore.Mvc;

namespace CropLoan.Api.Controllers
{
    [Route("api/cropLoan")]
    [ApiController]
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
        [Route("saveLoan")]
        public async Task SaveLoan([FromBody] CropLoanRequestModel cropLoanRequest)
        {
            await _cropLoanProcessController.SaveLoan(cropLoanRequest);
        }
    }
}
