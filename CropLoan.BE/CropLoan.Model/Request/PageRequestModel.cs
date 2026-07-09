using System.ComponentModel.DataAnnotations;

namespace CropLoan.Model.Request
{
    public class PageRequestModel
    {
        public Guid UID { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Name must be up to 100 characters")]
        public string Name { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
