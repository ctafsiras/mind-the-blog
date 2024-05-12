import { prisma } from "@/utils/prisma";

export async function GET(request: Request) {
  const me = await prisma.user.findMany({
    include: {
      blogSites: true,
    },
  });
  console.log(me);
  return Response.json({ me });
}
