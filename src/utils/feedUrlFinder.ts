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
    "/index.xml",
    "/feed.rss",
    "/feed.atom",
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
    const feed = await parser.parseURL(url + ext);

  });

  return {  };
}
