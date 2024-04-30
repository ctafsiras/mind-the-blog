import Parser from "rss-parser";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const parser = new Parser();
  const feed = await parser.parseURL(url as string);
  return Response.json({ feed });
}
