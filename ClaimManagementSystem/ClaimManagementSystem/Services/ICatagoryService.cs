using ClaimManagementSystem.Models;

namespace ClaimManagementSystem.Services
{
    public interface ICatagoryService
    {
        Task<List<Catagory>> Get();
    }
}
