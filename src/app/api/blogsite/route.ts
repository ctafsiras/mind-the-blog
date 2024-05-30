import { feedUrlFinder } from "@/utils/feedUrlFinder";
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
      await prisma.blogSite.update({
        where: {
          url: data.url,
        },
        data: {
          subscribers: {
            push: data.email,
          },
        },
      });
      return Response.json({ blogSite: isExist });
    }
    const blogSite = await prisma.blogSite.create({
      data: {
        url: data.url,
        subscribers: [data.email],
      },
    });

    const feedData: any = await feedUrlFinder(data.url);
    if (feedData.success) {
      await prisma.blogSite.update({
        where: {
          id: blogSite.id,
        },
        data: {
          url: data.url,
          name: feedData.name,
          feedUrl: feedData.feedUrl,
          latestBlogDescription: feedData.latestBlogDescription,
          latestBlogTitle: feedData.latestBlogTitle,
          latestBlogUrl: feedData.latestBlogUrl,
          latestBlogDate: feedData.latestBlogDate,
        },
      });
    }

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
  const { latestBlog } = await getLatestBlog(data.feedUrl);
  const { id } = data;
  const blogSite = await prisma.blogSite.update({
    where: {
      id: id,
    },
    data: {
      url: data.url,
      name: data.name,
      feedUrl: data.feedUrl,
      latestBlogDescription: latestBlog.content,
      latestBlogTitle: latestBlog.title,
      latestBlogUrl: latestBlog.link,
      latestBlogDate: latestBlog.isoDate,
    },
  });
  return Response.json({ blogSite });
}
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const blogSite = await prisma.blogSite.delete({
    where: {
      id,
    },
  });
  return Response.json({ blogSite });
}
