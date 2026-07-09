using System;

namespace CropLoan.Api.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public sealed class RequireRoleAttribute : Attribute
    {
        public RequireRoleAttribute(string role)
        {
            Role = role;
        }

        public string Role { get; }
    }
}
