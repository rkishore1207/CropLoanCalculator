using Microsoft.Extensions.Configuration;

namespace CropLoan.Utility.Configuration
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly IConfiguration _configuration;

        public ConfigurationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string? GetConnectionString => _configuration.GetValue<string>("SqlConnectionString");
    }
}
