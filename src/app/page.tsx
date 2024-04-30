import { getLatestBlog } from "@/utils/latestBlog";
import Parser from "rss-parser";

export default async function Home() {
  const parser = new Parser();
  const feed = await parser.parseURL("https://css-tricks.com/feed/");

  //array of five links
  const src = [
    "https://css-tricks.com/feed/",
    "https://www.smashingmagazine.com/feed/",
    "https://www.sitepoint.com/feed/",
    "https://www.webdesignerdepot.com/feed/",
    "https://www.hongkiat.com/blog/feed/",
  ];

  const links = await Promise.all(
    src.map(async (url) => {
      const blogs = await parser.parseURL(url);
      console.log(blogs.items[0].title);
      return {
        blog: blogs.items[0],
        title: blogs.title,
      };
    })
  );
  console.log("object", links);
  return (
    <div className="flex flex-col justify-evenly items-center min-h-screen">
      <h2 className="text-4xl font-bold">Welcome to Mind The Blog</h2>
      {links.map((link, i) => (
        <div key={i} className="card w-96 bg-primary text-primary-content my-2">
          <div className="card-body">
            <h2 className="card-title">{link.title}</h2>
            <p>{link?.blog.title}</p>
            <div className="card-actions justify-end">
              <a href={link.blog.link} target="_blank" className="btn">
                Read Now
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
