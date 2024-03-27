using ClaimManagementSystem.Models;
using ClaimManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ClaimManagementSystem.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class ClaimController : ControllerBase
    {
        private readonly IClaimService _ClaimService;

        public ClaimController(IClaimService ClaimService)
        {
            _ClaimService = ClaimService;
        }

        [Authorize]
        [HttpGet]
        [Route("getClaims")]
        public async Task<ActionResult> Get()
        {
            try
            {
                var result = await _ClaimService.Get();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }


        [HttpGet]
        [Route("getClaim")]
        public async Task<ActionResult> Get(String email)
        {
            try
            {
                var result = await _ClaimService.GetByEmail(email);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }

        [HttpGet]
        [Route("getClaimById")]
        public async Task<ActionResult<Claims>> GetClaim(long claimId)
        {
            try
            {
                return await _ClaimService.GetById(claimId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }


        // POST api/<ClaimController>
        [HttpPost]
        [Route("saveClaim")]
        public async Task<ActionResult<Claims>> Post([FromBody] Claims claim)
        {
            try
            {
                var result = await _ClaimService.Create(claim);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        [Route("updateClaim")]
        public async Task<ActionResult> Update(string id, [FromBody] Claims details)
        {
            try
            {
                var clm = await _ClaimService.GetById(details.ClaimId);

                if (clm is null)
                {
                    return Ok(clm);
                }
                _ClaimService.Update(id, details);
                return Ok(details);
            }
            catch (Exception ex)
            {
                return StatusCode(404, ex.Message);
            }
        }
    }
}
