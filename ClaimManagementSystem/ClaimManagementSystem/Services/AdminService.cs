using Amazon.Runtime.SharedInterfaces;
using ClaimManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Org.BouncyCastle.Crypto.Macs;

namespace ClaimManagementSystem.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMongoCollection<Admin> _adminService;
        public AdminService(ICMSDetailsDB settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _adminService = database.GetCollection<Admin>(settings.AdminCollection);
        }

        public async Task<Admin> Create(Admin admin)
        {
            admin.CreatedBy = admin.Name;
            admin.CreatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            admin.UpdatedBy = admin.Name;
            admin.UpdatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            await _adminService.InsertOneAsync(admin);
            return admin;
        }
        public async Task<Admin> Login(Admin admin)
        {
            return await _adminService.Find<Admin>(c => c.Email == admin.Email & c.Password == admin.Password).FirstOrDefaultAsync();
        }

        public async Task<Admin> GetByGmail(string gmail)
        {
            return await _adminService.Find<Admin>(c => c.Email == gmail).FirstOrDefaultAsync();
        }

        public async void UpdateToken(string email, string token,DateTime expiry)
        {
            var result = await _adminService.Find<Admin>(c => c.Email == email).FirstOrDefaultAsync();
            result.Token = token;
            result.Expiry = expiry;
            result.UpdatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            await _adminService.ReplaceOneAsync(x => x.Id == result.Id, result);

        }



        public async void Update(string email,string password)
        {
            //Admin admin = await _adminService.Find<Admin>(c => c.Email == gmail).FirstOrDefaultAsync();
            //admin.UpdatedBy =admin.Name;
            var result = await _adminService.Find<Admin>(c => c.Email == email).FirstOrDefaultAsync();
            result.Password = password;
            result.UpdatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            await _adminService.ReplaceOneAsync(x=>x.Id == result.Id,result);
           
        }

        
    }
}
