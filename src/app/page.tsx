import React from "react";
import { signIn, signOut, auth } from "@/utils/auth";

const Homepage = async () => {
  const session = await auth();
  return (
    <div>
      {session?.user ? (
        <div>
          <h1>Hello {session.user.name}</h1>
          <div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="btn btn-secondary" type="submit">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1>User Not Signed In</h1>
          <div>
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
        </div>
      )}
    </div>
  );
};

export default Homepage;
