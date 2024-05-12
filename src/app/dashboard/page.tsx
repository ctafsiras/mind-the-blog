import AllBlogSiteTable from "@/components/AllBlogSiteTable";
import { auth, signIn } from "@/utils/auth";
import React from "react";

export default async function Dashboard() {
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
  if (session?.user?.email !== "ctafsiras@gmail.com") {
    return (
      <div className="flex justify-center">
        <h1>Don&apos;t ever try to do it Bro!</h1>
      </div>
    );
  }
  return (
    <div>
      <AllBlogSiteTable />
    </div>
  );
}
