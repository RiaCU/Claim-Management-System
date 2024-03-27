using ClaimManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace ClaimManagementSystem.Services
{
    public interface IAdminService
    {
        Task<Admin> Create(Admin admin);    
        Task<Admin> Login(Admin admin);
        Task<Admin> GetByGmail(string gmail);

        void UpdateToken(string email, string token,DateTime expiry);
        void Update(string email,string password);
    }
}
