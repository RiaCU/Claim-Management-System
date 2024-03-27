using ClaimManagementSystem.Models;

namespace ClaimManagementSystem.Services
{
    public interface IClaimService
    {
        Task<Claims> Create(Claims claim);
        Task<List<Claims>> Get();
        Task<List<Claims>> GetByEmail(string email);
        Task<Claims> GetById(long id);
        void Update(string id, Claims updateDetails);
    }
}
