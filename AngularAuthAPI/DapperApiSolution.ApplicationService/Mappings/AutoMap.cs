namespace DapperApiSolution.ApplicationService.Mappings
{
    using AutoMapper;
    using DapperApiSolution.ApplicationService.Dtos;
    using DapperApiSolution.Domain.DomainEntities;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class AutoMap:Profile
    {
        public AutoMap() 
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap(); 
        }
    }
}
