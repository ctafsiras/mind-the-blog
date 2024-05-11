"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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
      {/* The button to open modal */}
      <label htmlFor={blog.id} className="btn btn-primary">
        Update
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={blog.id} className="modal-toggle" />
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
      </div>
    </div>
  );
}
