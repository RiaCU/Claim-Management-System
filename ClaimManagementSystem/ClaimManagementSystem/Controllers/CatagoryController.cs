using ClaimManagementSystem.Models;
using ClaimManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClaimManagementSystem.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class CatagoryController : ControllerBase
    {
        private readonly ICatagoryService _catagoryService;

        public CatagoryController(ICatagoryService catagoryService)
        {
            _catagoryService = catagoryService;
            
        }

        [Authorize]
        [HttpGet]
        [Route("getCatagory")]
        public async Task<IActionResult> Create()
        {
            try
            {
                var result = await _catagoryService.Get();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}
