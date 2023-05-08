namespace AngularAuthAPI.Models.Dto
{
    public class loginDto
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int TokenExpire { get; set; }

    }
}
