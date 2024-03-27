using ClaimManagementSystem.Models;
using ClaimManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClaimManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalController : ControllerBase
    {
        public readonly IHospitalService _hospitalService;
        public HospitalController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        [HttpPost]
        [Route("saveHospital")]
        public async Task<ActionResult> Create(Hospital hospital)
        {
            try {
                
                var result = await _hospitalService.Create(hospital);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }


        [HttpGet]
        [Route("getHospital")]
        public async Task<ActionResult> Get()
        {
            var result = await _hospitalService.Get();
            return Ok(result);
                
        }
    }
}
