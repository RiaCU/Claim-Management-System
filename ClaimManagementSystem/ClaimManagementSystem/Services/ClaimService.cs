using ClaimManagementSystem.Models;
using Microsoft.VisualBasic;
using MongoDB.Driver;
using System.Security.Claims;

namespace ClaimManagementSystem.Services
{
    public class ClaimService : IClaimService
    {
        private readonly IMongoCollection<Claims> _claimService;
        public ClaimService(ICMSDetailsDB settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _claimService = database.GetCollection<Claims>(settings.ClaimCollection);
        }
        public async Task<Claims> Create(Claims claim)
        {
           
            var temp = await _claimService.Find<Claims>(details => true).ToListAsync();
            var count = temp.Count();
            if (count == 0)
                claim.ClaimId = 1;
            else
            {
                var x = await _claimService.Find<Claims>(c=> c.ClaimId == count+1).FirstOrDefaultAsync();
                while (x != null)
                    count++;
                claim.ClaimId = count+1;
            }
            claim.CreatedBy = claim.FirstName;
            claim.CreatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            claim.UpdatedBy = claim.FirstName;
            claim.UpdatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            await _claimService.InsertOneAsync(claim);
            return claim;
        }

        public async Task<List<Claims>> Get()
        {
            return await _claimService.Find<Claims>(c => true).ToListAsync();
        }

        public async Task<List<Claims>> GetByEmail(string email)
        {
           return await _claimService.Find<Claims>(c=> c.EmailId== email).ToListAsync();
        }

        public async Task<Claims> GetById(long id)
        {
            return await _claimService.Find<Claims>(c => c.ClaimId == id).FirstOrDefaultAsync();
        }

        public async void Update(string id, Claims updateDetails)
        {
            updateDetails.UpdatedBy = updateDetails.FirstName;
            updateDetails.UpdatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm"); ;
            await _claimService.ReplaceOneAsync(x => x.Id == id, updateDetails);
        }
    }
}
