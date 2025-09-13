using AutoMapper;
using CropLoan.Model.Entity;
using CropLoan.Model.Request;
using CropLoan.Model.View;

namespace CropLoan.Business.Helper
{
    public class Mapper : Profile
    {
        public Mapper() 
        {
            CreateMap<CropLoanViewModel, CropLoanEntityModel>().ReverseMap();
            CreateMap<CropLoanRequestModel, CropLoanEntityModel>().ReverseMap();
            CreateMap<PageViewModel, PageEntity>().ReverseMap();
            CreateMap<PageRequestModel, PageEntity>().ReverseMap();
        }
    }
}
