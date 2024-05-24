"use client";

import { urlCleaner } from "@/utils/urlCleaner";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
          type="text"
          value={hostname}
          placeholder="site.com"
        />
        <Button
          disabled={loading || hostname.split(".").length < 2}
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Add Website"
          )}
        </Button>
      </div>
    </div>
  );
}
