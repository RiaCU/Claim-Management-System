using ClaimManagementSystem.Models;

namespace ClaimManagementSystem.Services
{
    public interface ITemplateService
    {
        Task<Template> Create(Template template);
        Task<List<Template>> Get();
        Task<Template> GetById(string id);
        void Update(string id, Template updateDetails);
        Task<Template> Delete(string id);
    }
}
