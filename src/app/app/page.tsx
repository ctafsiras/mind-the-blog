import AddBlog from "@/components/AddBlog";
import { auth, signIn } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import Parser from "rss-parser";

export default async function Home() {
  const session = await auth();
  if (!session)
    return (
      <div className="flex justify-center">
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button className="btn btn-primary" type="submit">
            Signin with Google
          </button>
        </form>
      </div>
    );
  const blogSites = await prisma.blogSite.findMany({});

  return (
    <div className="flex flex-col justify-evenly items-center min-h-screen">
      <h2 className="text-4xl font-bold">Welcome to Mind The Blog</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        <AddBlog />
        {blogSites.map((site) => (
          <div
            key={site.id}
            className="card w-96 bg-primary text-primary-content my-2"
          >
            <span className="absolute top-2 right-2">
              <button className="btn btn-square btn-sm btn-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
            <div className="card-body">
              <h2 className="card-title">
                {site.name ?? `${site.url} Waiting For Admin Approval`}
              </h2>
              <h3 className="text-xl font-bold">
                <div className="badge badge-info gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  info
                </div>
                Latest: {site?.latestBlogTitle}
              </h3>
              <p>{site?.latestBlogDescription}</p>
              <div className="card-actions justify-end">
                <a
                  href={site.latestBlogUrl as string}
                  target="_blank"
                  className={`btn ${!site.latestBlogUrl && "disabled"}`}
                >
                  Read Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
