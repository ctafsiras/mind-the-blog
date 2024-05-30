import Parser from "rss-parser";
export async function feedUrlFinder(url: string) {
  const extensions = [
    "/feed",
    "/rss",
    "/rss.xml",
    "/atom.xml",
    "/feed/rss",
    "/feed/atom",
    "/feed.xml",
    "/feed.rss",
    "/feed.atom",
    "/index.xml",
    "/blog/feed",
    "/blog/rss",
    "/blog/rss.xml",
    "/blog/atom.xml",
    "/blog/feed/rss",
    "/blog/feed/atom",
    "/blog/feed.xml",
    "/blog/index.xml",
    "/news/feed",
    "/news/rss",
  ];

  const parser = new Parser();
  extensions.forEach(async (ext) => {
    const feed = await parser.parseURL("https://" + url + ext);
    if (feed.feedUrl) {
      console.log(ext, feed.title);
      return {
        success: true,
        feedUrl: feed.feedUrl,
        name: feed.title,
        latestBlogDescription: feed.items[0].content,
        latestBlogTitle: feed.items[0].title,
        latestBlogUrl: feed.items[0].link,
        latestBlogDate: feed.items[0].isoDate,
      };
    }
  });

  return { success: false };
}
