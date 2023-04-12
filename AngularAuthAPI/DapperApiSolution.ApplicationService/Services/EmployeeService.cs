namespace DapperApiSolution.ApplicationService.Services
{
    using AutoMapper;
    using DapperApiSolution.ApplicationService.Dtos;
    using DapperApiSolution.ApplicationService.IServices;
    using DapperApiSolution.ApplicationService.Mappings;
    using DapperApiSolution.Domain.IRepositories;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository,IMapper mapper )
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<List<EmployeeDto>> GetAll()
        {
            try
            {
                var result = await _employeeRepository.GetAll();
                //var mappedResult = _mapper.Map<List<EmployeeDto>>(result);
                var mappedResult = ManualMap.GetEmployeeDtos(result);
                return mappedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EmployeeDto> GetById(int id)
        {
            try
            {
                var result = await _employeeRepository.GetById(id);
                // var mappedResult = _mapper.Map<EmployeeDto>(result);
                var mappedResult = ManualMap.GetEmployeeDTO(result);
                return mappedResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> Create(EmployeeDto employeeDto)
        {
            try
            {
                //var mappedEmployee = _mapper.Map<Employee>(employeeDto);
                var employee = ManualMap.GetEmployee(employeeDto);
                return await _employeeRepository.Create(employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> Update(EmployeeDto employeeDto)
        {
            try
            {
                //var mappedEmployee = _mapper.Map<Employee>(employeeDto);
                var employee = ManualMap.GetEmployee(employeeDto);
                return await _employeeRepository.Update(employee);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<int> Delete(int id)
        {
            try
            {
                var result = await _employeeRepository.Delete(id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
