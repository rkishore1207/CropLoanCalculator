using CropLoan.Api.Attributes;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CropLoan.Api.Middlewares
{
    public class AuthorizationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AuthorizationMiddleware> _logger;

        public AuthorizationMiddleware(RequestDelegate next, ILogger<AuthorizationMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var endpoint = context.GetEndpoint();
            if (endpoint is null)
            {
                await _next(context);
                return;
            }

            var allowsAnonymous = endpoint.Metadata.GetMetadata<AllowAnonymousAttribute>() is not null;
            if (allowsAnonymous)
            {
                await _next(context);
                return;
            }

            if (context.User?.Identity?.IsAuthenticated != true)
            {
                _logger.LogWarning("Authorization failed for {Path}: unauthenticated request", context.Request.Path);
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new { errorCode = "UNAUTHORIZED", message = "Authentication is required" });
                return;
            }

            var roleRequirements = endpoint.Metadata.GetOrderedMetadata<RequireRoleAttribute>();
            if (roleRequirements.Count != 0)
            {
                var currentRole = context.User.FindFirst(ClaimTypes.Role)?.Value;
                var isAllowed = roleRequirements.Any(x => string.Equals(x.Role, currentRole, StringComparison.OrdinalIgnoreCase));

                if (!isAllowed)
                {
                    _logger.LogWarning("Authorization failed for {Path}: role {Role} lacks permission", context.Request.Path, currentRole ?? "Unknown");
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsJsonAsync(new { errorCode = "FORBIDDEN", message = "You do not have permission to access this resource" });
                    return;
                }
            }

            await _next(context);
        }
    }
}
