namespace DapperApiSolution.Domain.IRepositories
{
    using DapperApiSolution.Domain.DomainEntities;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public interface IEmployeeRepository
    {
        public Task<List<Employee>> GetAll();
        public Task<Employee> GetById(int id);
        public Task<int> Create(Employee employee);
        public Task<int> Update(Employee employee);
        public Task<int> Delete(int id);
    }
}
