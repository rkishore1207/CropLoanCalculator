
using CropLoan.Api.Middlewares;
using CropLoan.Api.Security;
using CropLoan.Utility.Configuration;
using CropLoan.Data;
using CropLoan.Business;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services)
    .Enrich.FromLogContext());

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IConfigurationService, ConfigurationService>();
builder.Services.Configure<AuthSettings>(builder.Configuration.GetSection(AuthSettings.SectionName));

builder.Services.AddBusinessServices().AddDataServices();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("ReactCORS", options =>
    {
        options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("ReactCORS");
//app.UseMiddleware<AuthenticationMiddleware>();
//app.UseMiddleware<AuthorizationMiddleware>();


app.MapControllers();

app.Run();