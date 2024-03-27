using ClaimManagementSystem.Models;
using MongoDB.Driver;
using System.Security.Claims;

namespace ClaimManagementSystem.Services
{
    public class HospitalService : IHospitalService
    {
        public readonly IMongoCollection<Hospital> _hospitalService;
        public HospitalService(ICMSDetailsDB setting,IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(setting.DatabaseName);
            _hospitalService = database.GetCollection<Hospital>(setting.HospitalCollection);
        }
        public async Task<Hospital> Create(Hospital hospital)
        {
            var temp = await _hospitalService.Find<Hospital>(details => true).ToListAsync();
            var count = temp.Count();
            if (count == 0)
                hospital.HospitalId = 1;
            else
            {
                var x = await _hospitalService.Find<Hospital>(c => c.HospitalId == count + 1).FirstOrDefaultAsync();
                while (x != null)
                    count++;
                hospital.HospitalId = count + 1;
            }
            await _hospitalService.InsertOneAsync(hospital);
            return hospital;
        }

        public async Task<List<Hospital>> Get()
        {
            return await _hospitalService.Find(details => true).ToListAsync();
        }
    }
}
