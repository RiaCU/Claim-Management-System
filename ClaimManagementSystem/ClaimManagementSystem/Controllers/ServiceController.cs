using ClaimManagementSystem.Models;
using ClaimManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClaimManagementSystem.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }
        // GET: api/<TemplateController>
        [HttpGet]
        [Route("getService")]
        public async Task<ActionResult> Get()
        {
            var result = await _serviceService.Get();
            return Ok(result);

        }



        // POST api/<TemplateController>
        [Authorize]
        [HttpPost]
        [Route("saveService")]
        public async Task<IActionResult> Create([FromBody] Service service)
        {
            try
            {
                var result = await _serviceService.Create(service);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("deleteService")]
        public async Task<ActionResult<Service>> Delete(String id)
        {
            try
            {
                return await _serviceService.Delete(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }

    }
}
