using ClaimManagementSystem.Models;
using MongoDB.Driver;
using System.Security.Claims;

namespace ClaimManagementSystem.Services
{
    public class TemplateService : ITemplateService
    {
        private readonly IMongoCollection<Template> _templateService;
        public TemplateService(ICMSDetailsDB settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _templateService = database.GetCollection<Template>(settings.TemplateCollection);
        }
        public async Task<Template> Create(Template template)
        {
            var temp = await _templateService.Find<Template>(details => true).ToListAsync();
            var count = temp.Count();
            if (count == 0)
                template.TemplateId = 1;
            else
            {
                var x = await _templateService.Find<Template>(c => c.TemplateId == count + 1).FirstOrDefaultAsync();
                while (x != null)
                    count++;
                template.TemplateId = count + 1;
            }
            template.CreatedBy = "Admin";
            template.CreatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            //template.UpdatedBy = "Admin";
            //template.UpdatedOn = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            await _templateService.InsertOneAsync(template);
            return template;
            
        }

        public async Task<List<Template>> Get()
        {
            return await _templateService.Find(details => true).ToListAsync();
        }

        public async Task<Template> GetById(string id)
        {
            return await _templateService.Find<Template>(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async void Update(string id, Template updateDetails)
        {            
            updateDetails.UpdatedBy = "Admin";
            updateDetails.UpdatedBy = DateTime.Now.ToString("MM-dd-yyyy H:mm");
            await _templateService.ReplaceOneAsync(x => x.Id == id, updateDetails);
        }

        public async Task<Template> Delete(string id)
        {
            Template temp = await _templateService.Find<Template>(c => c.Id == id).FirstOrDefaultAsync();
            await _templateService.DeleteOneAsync(x => x.Id == id);
            return temp;
        }
    }
}
