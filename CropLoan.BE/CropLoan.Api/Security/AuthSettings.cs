using System.Collections.Generic;

namespace CropLoan.Api.Security
{
    public sealed class AuthSettings
    {
        public const string SectionName = "AuthSettings";

        public List<TokenDefinition> Tokens { get; set; } = new();
    }

    public sealed class TokenDefinition
    {
        public string Token { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
