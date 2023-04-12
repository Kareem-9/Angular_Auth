namespace DapperApiSolution.ApplicationService.Mappings
{
    using DapperApiSolution.ApplicationService.Dtos;
    using DapperApiSolution.Domain.DomainEntities;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class ManualMap
    {
        //EmployeeDto mapped to Employee
        public static Employee GetEmployee(EmployeeDto employee)
        {
            return new Employee()
            {
                Id = employee.Id,
                Name= employee.Name,
                Company = employee.Company,
                Email = employee.Email,
                Mobile = employee.Mobile,
                DateOfBirth = employee.DateOfBirth,
                Gender = employee.Gender,
                Salary = employee.Salary,
                Location = employee.Location
            };
        }

        public static EmployeeDto GetEmployeeDTO(Employee employee)
        {
            return new EmployeeDto()
            {
                Id = employee.Id,
                Name = employee.Name,
                Company = employee.Company,
                Email = employee.Email,
                Mobile = employee.Mobile,
                DateOfBirth = employee.DateOfBirth,
                Gender = employee.Gender,
                Salary = employee.Salary,
                Location = employee.Location
            };
        }

        public static List<EmployeeDto> GetEmployeeDtos(List<Employee> employees)
        {
            List<EmployeeDto> list = new List<EmployeeDto>();

            foreach (Employee employeesDTO in employees)
            {
                list.Add(GetEmployeeDTO(employeesDTO));
            }
            return list;
        }
    }
}
