import { getLatestBlog } from "@/utils/latestBlog";
import { prisma } from "@/utils/prisma";
import sgMail from "@sendgrid/mail";

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

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
      const res = await mg.messages.create("ctanbiras.me", {
        from: "MTB Admin <mailgun@ctanbiras.me>",
        to: ["ctafsiras@gmail.com"],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>",
      });
      console.log("Mail Res", res);
      // SENDGRID MAIL SYSTEM
      // const msg = {
      //   to: "ctafsiras@gmail.com", // Change to your recipient
      //   from: "ctafsiras@gmail.com", // Change to your verified sender
      //   subject: `No new blog`,
      //   text: "No new blog text",
      // };
      // await sgMail.send(msg);
    } else {
      console.log(latestBlog.title, "New blog");

      const res = await mg.messages.create("ctanbiras.me", {
        from: "Not MTB Admin <mailgun@ctanbiras.me>",
        to: ["ctafsiras@gmail.com"],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>",
      });
      console.log("Mail Res", res);

      // SENDGRID MAIL SYSTEM

      // const msg = {
      //   to: "ctafsiras@gmail.com", // Change to your recipient
      //   from: "ctafsiras@gmail.com", // Change to your verified sender
      //   subject: `${site.name} has a new blog`,
      //   text: "and easy to do anywhere, even with Node.js",
      //   html: `
      //   <h1>${site.name} has a new blog</h1>
      //   <h2>${latestBlog.title}</h2>
      //   <p>${latestBlog.description}</p>
      //   <a href="${latestBlog.link}">Read more</a>
      //   `,
      // };
      // const res = await sgMail.send(msg);
      // console.log(res);
      if (res.status === 200) {
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

  return Response.json({ success: true });
}
