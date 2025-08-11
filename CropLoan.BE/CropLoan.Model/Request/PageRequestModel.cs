namespace CropLoan.Model.Request
{
    public class PageRequestModel
    {
        public Guid UID { get; set; }
        public string Name { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}
