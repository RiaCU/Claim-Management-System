namespace ClaimManagementSystem.Services
{
    public class CMSDetailsDB : ICMSDetailsDB
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string AdminCollection { get; set; } = string.Empty;
        public string UserCollection { get; set; } = string.Empty;
        public string CatagoryCollection { get; set; } = string.Empty;
        public string ServiceCollection { get; set; } = string.Empty;
        public string TemplateCollection { get; set; } = string.Empty;
        public string ClaimCollection { get; set; } = string.Empty;
        public string HospitalCollection { get; set; } = string.Empty;
    }
}
