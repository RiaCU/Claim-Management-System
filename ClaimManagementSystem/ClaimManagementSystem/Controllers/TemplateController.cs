using ClaimManagementSystem.Models;
using ClaimManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ClaimManagementSystem.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateService _TemplateService;

        public TemplateController(ITemplateService TemplateService)
        {
            _TemplateService = TemplateService;
        }
        // GET: api/<TemplateController>
        
        [HttpGet]
        [Route("getTemplate")]
        public async Task<ActionResult> Get()
        {
            var result = await _TemplateService.Get();
            return Ok(result);

        }



        // POST api/<TemplateController>
        [Authorize]
        [HttpPost]
        [Route("saveTemplate")]
        public async Task<IActionResult> Create([FromBody] Template template)
        {
            try
            {
                var result = await _TemplateService.Create(template);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Route("updateTemplate")]
        public async Task<ActionResult> Update(string id, [FromBody] Template details)
        {
            try
            {
                var clm = await _TemplateService.GetById(id);

                if (clm is null)
                {
                    return Ok(clm);
                }
                _TemplateService.Update(id, details);
                return Ok(details);
            }
            catch (Exception ex)
            {
                return StatusCode(404, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("deleteTemplate")]
        public async Task<ActionResult<Template>> Delete(String id)
        {
            try
            {
                return await _TemplateService.Delete(id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }

    }
}
