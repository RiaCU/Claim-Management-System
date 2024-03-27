using ClaimManagementSystem.Models;
using MongoDB.Driver;

namespace ClaimManagementSystem.Services
{
    public class CatagoryService : ICatagoryService
    {
        private readonly IMongoCollection<Catagory> _catagoryService;
        public CatagoryService(ICMSDetailsDB settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _catagoryService = database.GetCollection<Catagory>(settings.CatagoryCollection);
        }

        public async Task<List<Catagory>> Get()
        {
            
            return await _catagoryService.Find(details => true).ToListAsync();
        }
    }
}
