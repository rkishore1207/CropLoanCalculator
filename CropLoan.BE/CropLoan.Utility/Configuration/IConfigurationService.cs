namespace CropLoan.Utility.Configuration
{
    public interface IConfigurationService
    {
        public string? GetConnectionString { get; }
    }
}
