using CropLoan.Api.Security;
using Microsoft.Extensions.Options;
using System.Security.Claims;

namespace CropLoan.Api.Middlewares
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AuthenticationMiddleware> _logger;

        public AuthenticationMiddleware(RequestDelegate next, ILogger<AuthenticationMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, IOptions<AuthSettings> authOptions)
        {
            if (IsAnonymousPath(context.Request.Path) || HttpMethods.IsOptions(context.Request.Method))
            {
                await _next(context);
                return;
            }

            if (!context.Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
            {
                _logger.LogWarning("Authentication failed for {Path}: missing Authorization header", context.Request.Path);
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { errorCode = "UNAUTHORIZED", message = "Missing Authorization header" });
                return;
            }

            var authValue = authorizationHeader.ToString();
            var token = authValue.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase)
                ? authValue[7..].Trim()
                : string.Empty;

            if (string.IsNullOrWhiteSpace(token))
            {
                _logger.LogWarning("Authentication failed for {Path}: invalid bearer token format", context.Request.Path);
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { errorCode = "UNAUTHORIZED", message = "Invalid bearer token format" });
                return;
            }

            var tokenInfo = authOptions.Value.Tokens.FirstOrDefault(x => x.Token == token);
            if (tokenInfo is null)
            {
                _logger.LogWarning("Authentication failed for {Path}: token not recognized", context.Request.Path);
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { errorCode = "UNAUTHORIZED", message = "Token is not valid" });
                return;
            }

            var claims = new List<Claim>
            {
                new(ClaimTypes.Name, tokenInfo.UserName),
                new(ClaimTypes.Role, tokenInfo.Role)
            };

            context.User = new ClaimsPrincipal(new ClaimsIdentity(claims, "CustomToken"));
            context.Items[nameof(AuthenticatedUser)] = new AuthenticatedUser
            {
                UserName = tokenInfo.UserName,
                Role = tokenInfo.Role,
                Token = token
            };

            _logger.LogInformation("Authenticated request for {UserName} with role {Role} on {Path}", tokenInfo.UserName, tokenInfo.Role, context.Request.Path);
            await _next(context);
        }

        private static bool IsAnonymousPath(PathString path)
        {
            return path.StartsWithSegments("/swagger") || path.StartsWithSegments("/favicon.ico");
        }
    }
}
