namespace DapperApiSolution.Infrastructure.Repositories
{
    using Microsoft.Extensions.Configuration;
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Data;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using DapperApiSolution.Domain.DomainEntities;
    using Dapper;
    using DapperApiSolution.Domain.IRepositories;

    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IConfiguration _configuration;
        public EmployeeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        protected IDbConnection CreateConnection()
        {
            return new SqlConnection(_configuration.GetConnectionString("DataConnection"));
        }

        public async Task<List<Employee>> GetAll()
        {
            string sQuery = "GetEmployeeDetails";

            using (var dbConnection = CreateConnection())
            {
                return (await dbConnection.QueryAsync<Employee>(sQuery, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<Employee> GetById(int id)
        {
            string query = "GetEmployeeDetailsById";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("Id", id);

            using (var dbConnection = CreateConnection())
            {
                return (await dbConnection.QueryFirstOrDefaultAsync<Employee>(query, parameters, commandType: CommandType.StoredProcedure));
            }
        }

        public async Task<int> Create(Employee employee)
        {
            var query = "AddEmployeeDetails";
            var parameters = new DynamicParameters();
            //parameters.Add("Id", employee.Id);
            parameters.Add("Name", employee.Name);
            parameters.Add("Company", employee.Company);
            parameters.Add("Email", employee.Email);
            parameters.Add("Mobile", employee.Mobile);
            parameters.Add("DateOfBirth", employee.DateOfBirth);
            parameters.Add("Gender", employee.Gender);
            parameters.Add("Salary", employee.Salary);
            parameters.Add("Location", employee.Location);
           
            using (var dbConnection = CreateConnection())
            {
                return (await dbConnection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure));
            }
        }

        public async Task<int> Update(Employee employee)
        {
            var query = "UpdateEmployeeDetails";
            var parameters = new DynamicParameters();
            parameters.Add("Id", employee.Id);
            parameters.Add("Name", employee.Name);
            parameters.Add("Company", employee.Company);
            parameters.Add("Email",employee.Email);
            parameters.Add("Mobile", employee.Mobile);
            parameters.Add("DateOfBirth", employee.DateOfBirth);
            parameters.Add("Gender", employee.Gender);
            parameters.Add("Salary", employee.Salary);
            parameters.Add("Location", employee.Location);

            using (var dbConnection = CreateConnection())
            {
                return (await dbConnection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure));
            }
        }

        public async Task<int> Delete(int id)
        {
            string sQuery = "DeleteEmployeeDetails";
            var parameters = new DynamicParameters();
            parameters.Add("Id", id);

            using (var dbConnection = CreateConnection())
            {
                return (await dbConnection.ExecuteAsync(sQuery, parameters, commandType: CommandType.StoredProcedure));
            }
        }
    }
}
