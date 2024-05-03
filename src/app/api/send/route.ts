import Mailgun from "mailgun.js";

export async function GET() {
  const formData = require("form-data");
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key:
      process.env.MAILGUN_API_KEY ||
      "b6934a588bd634714f5460e5d29a8b9f-381f2624-77d01bb9",
  });

  const res = await mg.messages.create(
    "sandbox00049a54d92e43c0846eddff264ca972.mailgun.org",
    {
      from: "Admin MTB <mailgun@sandbox00049a54d92e43c0846eddff264ca972.mailgun.org>",
      to: ["ctafsiras@gmail.com"],
      subject: "Hello About MTB",
      text: "Testing some Mailgun awesomeness!TExt",
      html: "<h1>Testing some Mailgun awesomeness!HTML</h1>",
    }
  );
  // .then((msg) => console.log(msg)) // logs response data
  // .catch((err) => console.log(err)); // logs any error

  return Response.json({ res });
}
