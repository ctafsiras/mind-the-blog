/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/EhM5iuL7dCU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { JSX, SVGProps } from "react";

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export function BenefitSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The Benefits of Our App
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <CheckIcon className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <div>
                <h3 className="text-lg font-medium">Stay Informed</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Never miss an update from your favorite blogs.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckIcon className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <div>
                <h3 className="text-lg font-medium">Save Time</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No need to manually check each blog for new posts.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckIcon className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <div>
                <h3 className="text-lg font-medium">Personalized Alerts</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Customize your notifications to receive only what you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
