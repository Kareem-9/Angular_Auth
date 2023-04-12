namespace DapperApiSolution.ApplicationService.IServices
{
    using DapperApiSolution.ApplicationService.Dtos;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public interface IEmployeeService
    {
        public Task<List<EmployeeDto>> GetAll();
        public Task<EmployeeDto> GetById(int id);
        public Task<int> Create(EmployeeDto employeeDto);
        public Task<int> Update(EmployeeDto employeeDto);
        public Task<int> Delete(int id);
    }
}
