using ClaimManagementSystem.Models;

namespace ClaimManagementSystem.Services
{
    public interface IHospitalService
    {
        Task<Hospital> Create(Hospital hospital);
        Task<List<Hospital>> Get();
    }
}
