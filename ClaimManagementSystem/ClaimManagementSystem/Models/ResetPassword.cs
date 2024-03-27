namespace ClaimManagementSystem.Models
{
    public record ResetPassword
    {
        public string Email { get; set; }=String.Empty;
        public string EmailToken { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;

    }
}
