"use client";

import { SVGProps, useState } from "react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function UpdateBlogSite({ blog }: { blog: any }) {
  const [name, setName] = useState(blog.name || "");
  const [url, setUrl] = useState(blog.url || "");
  const [feedUrl, setFeedUrl] = useState(blog.feedUrl || "");

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/blogsite`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, url, feedUrl, id: blog.id }),
      });
      if (response.ok) {
        toast.success("Blog updated successfully");
        window.location.reload();
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="ghost">
            <EditIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Site Name"
          />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="Site URL"
          />
          <Input
            value={feedUrl}
            onChange={(e) => setFeedUrl(e.target.value)}
            type="text"
            placeholder="Site Feed URL"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdate}>Update</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* The button to open modal */}
      {/* <label htmlFor={blog.id} className="btn btn-primary">
        Update
      </label> */}

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id={blog.id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box gap-4 space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="grow"
              placeholder="Site Name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            URL
            <input
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              className="grow"
              value={url}
              placeholder="site.com"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Feed URL
            <input
              onChange={(e) => setFeedUrl(e.target.value)}
              type="text"
              className="grow"
              value={feedUrl}
              placeholder="site.com/feed"
            />
          </label>

          <button
            onClick={handleUpdate}
            className="btn btn-primary items-center"
          >
            Update
          </button>
        </div>
        <label className="modal-backdrop" htmlFor={blog.id}>
          Close
        </label>
      </div> */}
    </div>
  );
}

function EditIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}
