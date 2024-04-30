import Parser from "rss-parser";
export async function getLatestBlog(url: string) {
  const parser = new Parser();
  const feed = await parser.parseURL(url as string);
  return { latestBlog: feed.items[0] };
}
