using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace TestConsoleApp.Tests
{
    public class TestConsoleAppTests
    {
        private HostedService HostedService { get; }
        private Mock<IApplicationLifetime> MockApplicationLifetime { get; }
        private Mock<Settings> MockSettings { get; }

        public TestConsoleAppTests()
        {
            this.MockApplicationLifetime = new Mock<IApplicationLifetime>();
            this.MockSettings = new Mock<Settings>();
            var mockOptions = new Mock<IOptions<Settings>>();
            mockOptions.SetupGet(x => x.Value).Returns(this.MockSettings.Object);

            this.HostedService = new HostedService(
                this.MockApplicationLifetime.Object,
                mockOptions.Object);
        }

        [Fact]
        public async Task HostedService_Invoke()
        {
            var isFinished = false;
            var waiter = Task.Run(async () =>
            {
                while (!isFinished)
                {
                    await Task.Delay(250);
                }
            });

            this.MockApplicationLifetime.Setup(m => m.StopApplication()).Callback(() => isFinished = true);
            this.MockSettings.SetupGet(x => x.DelayTime).Returns(1);
            await this.HostedService.StartAsync(default);

            await waiter;

            this.MockApplicationLifetime.Verify(x => x.StopApplication(), Times.Once);
        }
    }
}
