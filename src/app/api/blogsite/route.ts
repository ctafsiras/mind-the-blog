import { prisma } from "@/utils/prisma";

interface BlogSite {
  url: string;
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    // const isExist = await prisma.blogSite.findFirst({
    //   where: {
    //     url: url,
    //   },
    // });
    // if (isExist) {
    //   return Response.json({ id: isExist.id });
    // }
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
  console.log(data);
  const { id } = data;
  const blogSite = await prisma.blogSite.update({
    where: {
      id: id,
    },
    data: {
      url: data.url,
      name: data.name,
      feedUrl: data.feedUrl,
      description: data.description,
      latestBlogTitle: data.latestBlogTitle,
      latestBlogUrl: data.latestBlogUrl,
    },
  });
  return Response.json({ blogSite });
}
