import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn: async (user) => {
      console.log(user);
      try {
        const isExist = await prisma.user.findFirst({
          where: {
            email: user.user.email as string,
          },
        });
        if (isExist) {
          console.log("exist");
          return true;
        }
        const newUser = await prisma.user.create({
          data: {
            email: user.user.email as string,
            name: user.user.name as string,
          },
        });
        console.log(newUser);
      } catch (error) {
        console.log(error);
      }
      return true;
    },
  },
});
