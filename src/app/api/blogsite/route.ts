import { getLatestBlog } from "@/utils/latestBlog";
import { prisma } from "@/utils/prisma";

interface BlogSite {
  url: string;
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const isExist = await prisma.blogSite.findFirst({
      where: {
        url: data.url,
      },
    });
    if (isExist) {
      return Response.json({ blogSite: isExist });
    }
    const blogSite = await prisma.blogSite.create({
      data: {
        url: data.url,
      },
    });
    return Response.json({ blogSite });
  } catch (error) {
    console.error(error);
  } finally {
    // await prisma.$disconnect();
  }
}

// write a funtion to update this blogsite

export async function PUT(request: Request) {
  const data = await request.json();
  console.log("HELLO", data.feedUrl);
  const { latestBlog } = await getLatestBlog("https://" + data.feedUrl);
  console.log("BYE", latestBlog);
  const { id } = data;
  const blogSite = await prisma.blogSite.update({
    where: {
      id: id,
    },
    data: {
      url: data.url,
      name: data.name,
      feedUrl: data.feedUrl,
      description: latestBlog.content,
      latestBlogTitle: latestBlog.title,
      latestBlogUrl: latestBlog.link,
    },
  });
  return Response.json({ blogSite });
}
