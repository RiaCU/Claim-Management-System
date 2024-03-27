using ClaimManagementSystem.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace ClaimManagementSystem.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public void SendEmail(EmailModel emailModel)
        {
            var emailMessage = new MimeMessage();
            var from = _config.GetSection("EmailSettings").GetSection("From").Value; //_config["EmailSettings: From"];
            var host = _config.GetSection("EmailSettings").GetSection("SMTPService").Value;
            var password = _config.GetSection("EmailSettings").GetSection("Password").Value;
            emailMessage.From.Add(new MailboxAddress("Admin",from));
            emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
            emailMessage.Subject = emailModel.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = String.Format(emailModel.Content)
            };

            using(var client = new SmtpClient())
            {
                try
                {
                    client.Connect(host,465,true);
                    client.Authenticate(from, password);
                    client.Send(emailMessage);
                }
                catch(Exception ex)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            };
        }
    }
}
