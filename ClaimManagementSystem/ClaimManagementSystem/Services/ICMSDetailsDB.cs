namespace ClaimManagementSystem.Services
{
    public interface ICMSDetailsDB
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string AdminCollection { get; set; }
        public string UserCollection { get; set; }
        public string CatagoryCollection { get; set; }
        public string ServiceCollection { get; set; }
        public string TemplateCollection { get; set; }
        public string ClaimCollection { get; set; }
        public string HospitalCollection { get; set; }

    }
}
