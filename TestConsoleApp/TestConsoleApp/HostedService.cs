using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TestConsoleApp
{

    public class HostedService : BackgroundService
    {
        private IApplicationLifetime ApplicationLifetime { get; }
        private Settings Settings { get; }

        public HostedService(
            IApplicationLifetime applicationLifetime,
            IOptions<Settings> settings)
        {
            this.ApplicationLifetime = applicationLifetime ?? throw new ArgumentNullException(nameof(applicationLifetime));
            this.Settings = settings?.Value ?? throw new ArgumentNullException(nameof(settings));
        }

        /// <summary>
        /// This method is called when the <see cref="IHostedService" /> starts. The implementation should return a task that represents
        /// the lifetime of the long running operation(s) being performed.
        /// </summary>
        /// <param name="stoppingToken">Triggered when <see cref="M:Microsoft.Extensions.Hosting.IHostedService.StopAsync(System.Threading.CancellationToken)" /> is called.</param>
        /// <returns>A <see cref="Task" /> that represents the long running operations.</returns>
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            return Task.Run(async () =>
            {
                try
                {
                    for (int i = 0; i < 100; i++)
                    {
                        if (stoppingToken.IsCancellationRequested)
                        {
                            break;
                        }
                        Console.WriteLine(i);
                        await Task.Delay(Settings.DelayTime);
                    }

                    this.ApplicationLifetime.StopApplication();
                }
                catch (Exception)
                {
                    throw;
                }
            });
        }
    }
}
