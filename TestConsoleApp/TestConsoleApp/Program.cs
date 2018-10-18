using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

namespace TestConsoleApp
{
    public static class Program
    {
        static async Task Main(string[] args)
        {
            var host = new HostBuilder()
                .ConfigureHostConfiguration(configure =>
                {
                    configure.AddCommandLine(args);
                })
                .ConfigureAppConfiguration((context, configure) =>
                {
                    configure.AddCommandLine(args);
                    configure.SetBasePath(Directory.GetCurrentDirectory());
                    configure.AddJsonFile("appsettings.json", optional: true);
                    context.HostingEnvironment.ApplicationName = "TestConsoleApp";
                })
                .ConfigureServices((context, services) =>
                {
                    services
                    .AddOptions()
                    .Configure<Settings>(context.Configuration.GetSection("Settings"));
                })
                .UseHostedService<HostedService>()
                .UseConsoleLifetime();

            await host.RunConsoleAsync();

            Console.Write("\r\nPress any key to exit . . . ");
            Console.ReadKey(true);
        }
    }
}
