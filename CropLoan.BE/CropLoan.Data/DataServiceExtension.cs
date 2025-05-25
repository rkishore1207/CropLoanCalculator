using CropLoan.Data.Implementation;
using CropLoan.Data.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace CropLoan.Data
{
    public static class DataServiceExtension
    {
        public static IServiceCollection AddDataServices(this IServiceCollection services)
        {
            services.AddScoped<ICropLoanRepository, CropLoanRepository>();
            return services;
        }
    }
}
