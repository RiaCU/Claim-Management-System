using ClaimManagementSystem.Models;

namespace ClaimManagementSystem.Services
{
    public interface IEmailService
    {
        void SendEmail(EmailModel emailModel);
    }
}
