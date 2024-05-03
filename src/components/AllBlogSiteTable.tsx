import { prisma } from "@/utils/prisma";
import React from "react";
import UpdateBlogSite from "./UpdateBlogSite";

export default async function AllBlogSiteTable() {
  const data = await prisma.blogSite.findMany();
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>iD</th>
              <th>Blog Name</th>
              <th>url</th>
              <th>feedUrl</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((blog) => (
              <tr key={blog.id}>
                <th>{blog.id}</th>
                <td>{blog.name}</td>
                <td>{blog.url}</td>
                <td>{blog.feedUrl}</td>
                <td className="">
                  <UpdateBlogSite blog={blog} />
                </td>
                <td className="">X</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
