export function urlCleaner(url: string) {
  // const parsedUrl = new URL(url);
  // let hostname = parsedUrl.hostname;
  let hostname = url;
  if (hostname.startsWith("https://")) {
    hostname = hostname.slice(8);
  }
  if (hostname.startsWith("http://")) {
    hostname = hostname.slice(7);
  }
  if (hostname.startsWith("www.")) {
    hostname = hostname.slice(4);
  }
  if (hostname.split("/").length >= 0) {
    hostname = hostname.split("/")[0];
  }

  return hostname;
}
