export function urlCleaner(url: string) {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname;
  return hostname;
}
