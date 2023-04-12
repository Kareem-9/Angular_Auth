namespace DapperApiSolution.ApplicationService.Dtos
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Company { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public int Salary { get; set; }
        public string Location { get; set; }
    }
}
