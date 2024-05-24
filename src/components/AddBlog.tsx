"use client";

import { urlCleaner } from "@/utils/urlCleaner";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddBlog({ email }: { email: string }) {
  const [hostname, setHostname] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blogsite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlCleaner(hostname), email }),
      });
      if (response.ok) {
        toast.success("Blog added successfully");
        setHostname("");
        window.location.reload();
      } else {
        toast.error("Failed to add blog");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Input
          className="flex-1 max-w-md"
          onChange={(e) => setHostname(e.target.value)}
          type="url"
          value={hostname}
          placeholder="site.com"
        />
        <Button
          disabled={loading || hostname.split(".").length < 2}
          onClick={handleSubmit}
        >
          Add Website
        </Button>
      </div>
    </div>
    // <div className="card w-96 bg-secondary text-secondary-content my-2">
    //   <div className="card-body">
    //     <h2 className="card-title">Add New Blog</h2>
    //     <p>Just type the hostname url</p>
    //     <label className="input input-bordered flex items-center gap-2">
    //       <span className="text-secondary">https://</span>
    //       <input
    //         onChange={(e) => setHostname(e.target.value)}
    //         type="url"
    //         value={hostname}
    //         className="grow text-secondary"
    //         placeholder="site.com"
    //       />
    //     </label>
    //     <div className="card-actions justify-end">
    //       <button
    //         disabled={loading || hostname.split(".").length < 2}
    //         onClick={handleSubmit}
    //         className="btn"
    //       >
    //         Add
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
