export function urlCleaner(url: string) {
  const parsedUrl = new URL(url);
  let hostname = parsedUrl.hostname;
  if (hostname.startsWith("www.")) {
    hostname = hostname.slice(4);
  }
  return hostname;
}
