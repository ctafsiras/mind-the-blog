import { getLatestBlog } from "@/utils/latestBlog";
import { prisma } from "@/utils/prisma";
import sgMail from "@sendgrid/mail";

export async function GET() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const blogSites = await prisma.blogSite.findMany({
    where: {
      feedUrl: {
        not: null,
      },
    },
  });

  for (const site of blogSites) {
    const { latestBlog } = await getLatestBlog("https://" + site.feedUrl);
    if (latestBlog.title === site.latestBlogTitle) {
      console.log(latestBlog.title, "No new blog");
    } else {
      console.log(latestBlog.title, "New blog");
      const msg = {
        to: "ctafsiras@gmail.com", // Change to your recipient
        from: "ctafsiras@gmail.com", // Change to your verified sender
        subject: `${site.name} has a new blog`,
        text: "and easy to do anywhere, even with Node.js",
        html: `
        <h1>${site.name} has a new blog</h1>
        <h2>${latestBlog.title}</h2>
        <p>${latestBlog.description}</p>
        <a href="${latestBlog.link}">Read more</a>
        `,
      };
      const res = await sgMail.send(msg);
      console.log(res);
      if (res[0].statusCode === 202) {
        await prisma.blogSite.update({
          where: { id: site.id },
          data: {
            latestBlogTitle: latestBlog.title,
            latestBlogDescription: latestBlog.content,
            latestBlogUrl: latestBlog.link,
            latestBlogDate: latestBlog.isoDate,
          },
        });
      }
    }
  }

  // for (let i = 0; i < blogSites.length; i++) {
  //   const Blog = await getLatestBlog(blogSites[i].feedUrl as string);
  //   blogs.push(Blog);
  // }
  // const blogPromises = blogSites.map(async (site) => {
  //   return await getLatestBlog(site.feedUrl as string);
  // });

  // const blogs = await Promise.all(blogPromises);

  return Response.json({ success: true });
}
