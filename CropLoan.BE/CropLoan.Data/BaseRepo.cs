using CropLoan.Model.Dto;
using CropLoan.Utility.Configuration;
using CropLoan.Utility.Enums;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CropLoan.Data
{
    public class BaseRepo
    {
        private readonly IConfigurationService _configurationService;

        public BaseRepo(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        protected async Task<List<T>> ExecuteStoredProcedureAsync<T>(string spName, params SpParameter[] parameters) where T : new()
        {
            return await RetryLoginFailed(async () =>
            {
                List<T> result = new List<T>();
                using (var connection = await GetSqlConnection())
                {
                    using (var storedProcCommand = connection.CreateCommand())
                    {
                        storedProcCommand.CommandText = spName;
                        storedProcCommand.CommandType = CommandType.StoredProcedure;
                        storedProcCommand.CommandTimeout = 0;

                        foreach (var parameter in parameters)
                            storedProcCommand.Parameters.Add($"{parameter.Name}", parameter.SqlDbType).Value = parameter.Value ?? DBNull.Value;
                        using (var reader = await storedProcCommand.ExecuteReaderAsync(CommandBehavior.CloseConnection))
                        {
                            while (reader.Read())
                            {
                                var list = MapListReader<T>(reader);
                                result.AddRange(list);
                            }
                        }
                    }
                }
                return result;
            });
        }

        protected async Task<object> ExecuteStoredProcedureScalarAsync(string spName, params SpParameter[] spParameters)
        {
            return await RetryLoginFailed(async () =>
            {
                using (var connection = await GetSqlConnection())
                {
                    using (var storedProcCommand = connection.CreateCommand())
                    {
                        storedProcCommand.CommandText = spName;
                        storedProcCommand.CommandTimeout = 0;
                        storedProcCommand.CommandType = CommandType.StoredProcedure;

                        foreach (var parameter in spParameters)
                            storedProcCommand.Parameters.Add($"{parameter.Name}", parameter.SqlDbType).Value = parameter.Value ?? DBNull.Value;

                        return await storedProcCommand.ExecuteScalarAsync();
                    }
                }
            });
        }

        protected async Task ExecuteStoredProcedureNonQueryAsync(string spName, params SpParameter[] spParameters)
        {
            await RetryLoginFailed(async () =>
            {
                using (var connection = await GetSqlConnection())
                {
                    using (var storedProcCommand = connection.CreateCommand())
                    {
                        storedProcCommand.CommandText = spName;
                        storedProcCommand.CommandTimeout = 0;
                        storedProcCommand.CommandType = CommandType.StoredProcedure;

                        foreach (var parameter in spParameters)
                        {
                            if (parameter.Direction != ParameterDirection.Input)
                            {
                                SqlParameter sqlParameter = new SqlParameter()
                                {
                                    ParameterName = $"{parameter.Name}",
                                    DbType = parameter.DbType,
                                    Value = parameter.Value ?? DBNull.Value,
                                    Direction = parameter.Direction,
                                    SqlDbType = parameter.SqlDbType
                                };
                                storedProcCommand.Parameters.Add(sqlParameter);
                            }
                            else
                                storedProcCommand.Parameters.Add($"{parameter.Name}", parameter.SqlDbType).Value = parameter.Value ?? DBNull.Value;
                        }
                        return await storedProcCommand.ExecuteNonQueryAsync();
                    }
                }
            });
        }

        private static IEnumerable<T> MapListReader<T>(IDataReader reader)
        {
            var properties = typeof(T).GetProperties();
            var columnList = reader.GetSchemaTable()?.Select().Select(r => r.ItemArray[0]?.ToString()).ToList();
            var element = Activator.CreateInstance<T>();
            string column;
            if (columnList != null)
            {
                foreach (var property in properties)
                {
                    if (!columnList.Contains(property.Name))
                        continue;
                    column = property.Name;
                    var obj = reader[column];

                    if (obj.GetType() != typeof(DBNull))
                        property.SetValue(element, ChangeType(obj, property.PropertyType), null);
                }
            }
            yield return element;
        }

        private static object ChangeType(object obj, Type type)
        {
            if (type != null && type.IsGenericType && type.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (obj == null)
                    return null;
                type = Nullable.GetUnderlyingType(type);
            }
            return Convert.ChangeType(obj, type);
        }

        private async Task<SqlConnection> GetSqlConnection()
        {
            SqlConnection connection = null;
            try
            {
                connection = new SqlConnection(_configurationService.GetConnectionString);
                await connection.OpenAsync();
                return connection;
            }
            catch (Exception ex)
            {
                connection?.Close();
                connection?.Dispose();
                throw new Exception(ex.Message);
            }
        }

        private async Task<T> RetryLoginFailed<T>(Func<Task<T>> func)
        {
            try
            {
                return await func();
            }
            catch (SqlException ex) when (ex.Number == (int)SqlExceptionCodes.LoginFailed)
            {
                try
                {
                    return await func();
                }
                catch (SqlException)
                {
                    throw;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task BulkInsert(string tableName, DataTable dataTable)
        {
            using (SqlConnection connection = await GetSqlConnection())
            {
                using (SqlBulkCopy bulkCopy = new SqlBulkCopy(connection))
                {
                    bulkCopy.BulkCopyTimeout = 0;
                    bulkCopy.DestinationTableName = tableName;
                    bulkCopy.WriteToServer(dataTable);
                }
            }
        }
    }
}
