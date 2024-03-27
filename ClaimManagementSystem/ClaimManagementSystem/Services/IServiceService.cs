using ClaimManagementSystem.Models;
using System.Threading.Tasks;

namespace ClaimManagementSystem.Services
{
    public interface IServiceService
    {
        Task<List<Service>> Get();
        Task<Service> Create(Service service);
        Task<Service> Delete(string id);
    }
}
