using CropLoan.Model.View;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CropLoan.Api.Middlewares
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled exception for {Method} {Path}", context.Request.Method, context.Request.Path);
                await WriteErrorResponseAsync(context, exception);
            }
        }

        private static async Task WriteErrorResponseAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/problem+json";

            var (statusCode, title, detail, errorCode) = exception switch
            {
                BusinessException businessException => (StatusCodes.Status400BadRequest, "Business Validation Failed", businessException.ErrorMessage, businessException.ErrorCode),
                ValidationException validationException => (StatusCodes.Status400BadRequest, "Validation Failed", validationException.ValidationResult?.ErrorMessage ?? validationException.Message, "VALIDATION_ERROR"),
                UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "Unauthorized", "You are not authorized to perform this action", "UNAUTHORIZED"),
                _ => (StatusCodes.Status500InternalServerError, "Server Error", "Unexpected server error occurred", "INTERNAL_SERVER_ERROR")
            };

            context.Response.StatusCode = statusCode;

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = detail,
                Instance = context.Request.Path
            };
            problemDetails.Extensions["errorCode"] = errorCode;

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
    }
}
