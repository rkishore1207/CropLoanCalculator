using System.Data;

namespace CropLoan.Model.Dto
{
    public class SpParameter
    {
        public string? Name { get; set; }
        public SqlDbType SqlDbType { get; set; }
        public DbType DbType { get; set; }
        public ParameterDirection Direction { get; set; }
        public object? Value { get; set; }

        public static SpParameter Create(string name, object value, ParameterDirection direction = ParameterDirection.Input, SqlDbType sqlDbType = SqlDbType.NVarChar, DbType dbType = DbType.String)
        {
            return new SpParameter() { Name = name, SqlDbType = sqlDbType, Direction = direction, Value = value, DbType = dbType };
        }
    }
}
