using System.ComponentModel.DataAnnotations;

namespace CropLoan.Utility.Enums
{
    public enum CropType
    {
        [Display(Name = "Maize Rainfed")]
        MaizeRainfed = 1,
        [Display(Name = "Tapiocca IRR")]
        TapioccaIRR = 2,
        [Display(Name = "Cotton Rainfed")]
        CottonRainfed = 3
    }
}
