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

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

export async function POST() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const blogSites = await prisma.blogSite.findMany({
    where: {
      feedUrl: {
        not: null,
      },
    },
  });

  for (const site of blogSites) {
    const { latestBlog } = await getLatestBlog(site.feedUrl as string);
    if (latestBlog.title === site.latestBlogTitle) {
      //NodeMailer system
      // const info = await transporter.sendMail({
      //   from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      //   to: "ctafsiras@gmail.com", // list of receivers
      //   subject: "Hello ✔", // Subject line
      //   text: "Hello world?", // plain text body
      //   html: "<b>Hello world?</b>", // html body
      // });

      // console.log("Message sent: %s", info.messageId);
      //MailGun System
      // const res = await mg.messages.create("ctanbiras.me", {
      //   from: "MTB Admin <mailgun@ctanbiras.me>",
      //   to: ["ctafsiras@gmail.com"],
      //   subject: "Hello",
      //   text: "Testing some Mailgun awesomeness!",
      //   html: "<h1>Testing some Mailgun awesomeness!</h1>",
      // });
      // console.log("Mail Res", res);
      // SENDGRID MAIL SYSTEM
      // const msg = {
      //   to: "ctafsiras@gmail.com", // Change to your recipient
      //   from: "ctafsiras@gmail.com", // Change to your verified sender
      //   subject: `No new blog`,
      //   text: "No new blog text",
      // };
      // await sgMail.send(msg);
    } else {
      //NodeMailer system
      // const info = await transporter.sendMail({
      //   from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      //   to: "ctafsiras@gmail.com", // list of receivers
      //   subject: "Hello ✔", // Subject line
      //   text: "Hello world?", // plain text body
      //   html: "<b>Hello world?</b>", // html body
      // });

      // console.log("Message sent: %s", info.messageId);
      //MailGun System
      const res = await mg.messages.create("ctanbiras.me", {
        from: "Mind The Blog <reminder@ctanbiras.me>",
        to: ["ctafsiras@gmail.com"],
        bcc: site.subscribers,
        subject: `${site.name} has published a new blog`,
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333; text-align: center; margin-bottom: 20px;">${site.name} has a new blog</h1>
            <h2 style="color: #007bff; margin-top: 0;">${latestBlog.title}</h2>
            <a href="${latestBlog.link}" style="display: block; color: #ffffff; background-color: #007bff; text-decoration: none; text-align: center; padding: 10px; margin-top: 20px; border-radius: 5px;" target="_blank">Read the article</a>
        </div>
    </div>
        `,
      });
      // console.log("Mail Res", res);

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
        // if (info.status === 200) {
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
