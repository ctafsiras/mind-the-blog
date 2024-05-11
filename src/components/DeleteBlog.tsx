"use client";

import React from "react";
import toast from "react-hot-toast";

const DeleteBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = React.useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogsite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        toast.success("Blog deleted successfully");
        window.location.reload();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button disabled={loading} onClick={handleDelete} className="btn btn-error">
      {loading ? <span className="loading loading-spinner"></span> : "X"}
    </button>
  );
};

export default DeleteBlog;
