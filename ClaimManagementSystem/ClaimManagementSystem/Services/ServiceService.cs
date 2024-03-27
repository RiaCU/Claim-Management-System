using ClaimManagementSystem.Models;
using MongoDB.Driver;
using System.Security.Claims;

namespace ClaimManagementSystem.Services
{
    public class ServiceService : IServiceService
    {

        private readonly IMongoCollection<Service> _serviceService;
        public ServiceService(ICMSDetailsDB settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _serviceService = database.GetCollection<Service>(settings.ServiceCollection);
        }


        public async Task<List<Service>> Get()
        {
            return await _serviceService.Find(details => true).ToListAsync();
        }

        public async Task<Service> Create(Service service)
        {
            var temp = await _serviceService.Find<Service>(details => true).ToListAsync();
            var count = temp.Count();
            if (count == 0)
                service.ServiceId = 1;
            else
            {
                var x = await _serviceService.Find<Service>(c => c.ServiceId == count + 1).FirstOrDefaultAsync();
                while (x != null)
                    count++;
                service.ServiceId = count + 1;
            }
            service.CreatedBy = "Admin";
            service.CreatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            service.UpdatedBy = "Admin";
            service.UpdatedBy = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            await _serviceService.InsertOneAsync(service);
            return service;
        }

        public async Task<Service> Delete(string id)
        {
            Service temp = await _serviceService.Find<Service>(c => c.Id == id).FirstOrDefaultAsync();
            await _serviceService.DeleteOneAsync(x => x.Id == id);
            return temp;
        }
    }
}
