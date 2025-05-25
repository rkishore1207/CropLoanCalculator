using CropLoan.Business.Helper;
using CropLoan.Business.Implementation;
using CropLoan.Business.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace CropLoan.Business
{
    public static class BusinessServiceExtension
    {
        public static IServiceCollection AddBusinessServices(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Mapper));
            services.AddScoped<ICropLoanProcessController, CropLoanProcessController>();
            return services;
        }
    }
}
