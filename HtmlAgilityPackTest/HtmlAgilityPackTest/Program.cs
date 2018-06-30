using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace HtmlAgilityPackTest
{
    internal static class Program
    {
        private const string loginUrl = "https://searches.dwrcymru.com/pge/Welcome.aspx";
        private const string downloadsUrl = "https://searches.dwrcymru.com/pge/DownloadSrq.aspx";

        private static Dictionary<string, string> GetPostBodyElements(HtmlDocument doc)
        {
            var postBodyElements = new Dictionary<string, string>();
            try { postBodyElements.Add("__VIEWSTATE", doc.DocumentNode.SelectSingleNode("//*[@id=\"__VIEWSTATE\"]").GetAttributeValue("value", "").Trim()); } catch { }
            try { postBodyElements.Add("__VIEWSTATEGENERATOR", doc.DocumentNode.SelectSingleNode("//*[@id=\"__VIEWSTATEGENERATOR\"]").GetAttributeValue("value", "").Trim()); } catch { }
            try { postBodyElements.Add("__EVENTVALIDATION", doc.DocumentNode.SelectSingleNode("//*[@id=\"__EVENTVALIDATION\"]").GetAttributeValue("value", "").Trim()); } catch { }
            return postBodyElements;
        }

        private static string BuildRequest(Dictionary<string, string> postBodyElements)
        {
            var postMessage = new StringBuilder();
            foreach (var item in postBodyElements)
            {
                postMessage.AppendFormat("{0}={1}&", item.Key, HttpUtility.UrlEncode(item.Value));
            }
            
            return postMessage.ToString().TrimEnd('&');
        }

        private static WebResponse SubmitPostRequest(string Url, string LoginRequest, Cookie cookie = null)
        {
            byte[] byteArray = Encoding.Default.GetBytes(LoginRequest);
            var request = (HttpWebRequest)WebRequest.Create(Url);
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.AllowAutoRedirect = false;
            
            if (cookie != null)
                request.CookieContainer.Add(cookie);

            using (Stream requestStream = request.GetRequestStream())
            {
                requestStream.Write(byteArray, 0, byteArray.Length);
            }
            
            return request.GetResponse();
        }

        private static Cookie GetCookie(string CookieHeaderText, string Host)
        {
            var loggedInCookieHeader = CookieHeaderText;
            var loggedInCookieString = loggedInCookieHeader.Substring(0, loggedInCookieHeader.IndexOf(';'));
            var loggedInCookieName = loggedInCookieString.Substring(0, loggedInCookieString.IndexOf('='));
            var loggedInCookieValue = loggedInCookieString.Substring(loggedInCookieString.IndexOf('=') + 1, loggedInCookieString.Length - loggedInCookieString.IndexOf('=') - 1);
            return new Cookie(loggedInCookieName, loggedInCookieValue) { Domain = Host};
        }

        private static WebResponse SubmitGetRequest(string Url, Cookie cookie = null)
        {
            var request = (HttpWebRequest)WebRequest.Create(Url);
            request.Method = "GET";
            if (cookie != null)
            {
                request.CookieContainer = new CookieContainer();
                request.CookieContainer.Add(cookie);
            }
            return request.GetResponse();
        }

        private static void Main(string[] args)
        {
            Console.WriteLine("Starting process...\r\n");

            Console.WriteLine("Logging into Welsh Water website...");
            var web = new HtmlWeb();
            var loginDoc = web.Load(loginUrl);

            // Attempt login
            var postBodyElements = GetPostBodyElements(loginDoc);
            var loginRequest = BuildRequest(postBodyElements);
            loginRequest += String.Format("&{0}={1}&", "txtUserName", "STLGroup");

            Console.Write("Please enter the password: ");
            var password = Console.ReadLine();
            loginRequest += String.Format("{0}={1}&", "txtPassword", password);
            loginRequest += String.Format("{0}={1}&", "imgbtnLogin.x", "0");
            loginRequest += String.Format("{0}={1}", "imgbtnLogin.y", "0");
            var loginResponse = SubmitPostRequest(loginUrl, loginRequest);
            var loginResponseUri = loginResponse.ResponseUri.AbsoluteUri;

            // Get cookie and get downloads page
            Console.WriteLine("Navigating to download page...");
            var loggedInCookie = GetCookie(loginResponse.Headers["Set-Cookie"], "searches.dwrcymru.com");
            var downloadPageResponse = SubmitGetRequest(downloadsUrl, loggedInCookie);

            // Open downloads link
            Console.WriteLine("Initialising download...");
            var downloadsPageDoc = new HtmlDocument();
            downloadsPageDoc.Load(downloadPageResponse.GetResponseStream());
            postBodyElements = GetPostBodyElements(downloadsPageDoc);
            var downloadRequest = BuildRequest(postBodyElements);
            downloadRequest += String.Format("&{0}={1}", "__EVENTTARGET", HttpUtility.UrlEncode("grdSrqList$_ctl2$_ctl0"));

            // Download PDF
            Console.WriteLine("Downloading PDF...");
            var downloadResponse = SubmitPostRequest(downloadsUrl, downloadRequest);
            var downloadResultDoc = new HtmlDocument();
            var memoryStream = new MemoryStream();
            downloadResponse.GetResponseStream().CopyTo(memoryStream);
            File.WriteAllBytes(@"C:\Temp\Test.pdf", memoryStream.ToArray());

            Console.WriteLine("Finished download.");

            Console.Write("\r\nPress any key to exit . . . ");
            Console.ReadKey(true);
        }
    }
}
