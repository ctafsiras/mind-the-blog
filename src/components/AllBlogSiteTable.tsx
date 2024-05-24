import { prisma } from "@/utils/prisma";
import React, { SVGProps } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import UpdateBlogSite from "./UpdateBlogSite";
import DeleteBlog from "./DeleteBlog";

export default async function AllBlogSiteTable() {
  const data = await prisma.blogSite.findMany();
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Feed URL</TableHead>
            <TableHead>User Count</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">{blog.id}</TableCell>
              <TableCell>{blog.name}</TableCell>
              <TableCell>{blog.url}</TableCell>
              <TableCell>{blog.feedUrl}</TableCell>
              <TableCell>{blog.subscribers.length}</TableCell>
              <TableCell className="text-center flex space-x-2">
                <UpdateBlogSite blog={blog} />
                <DeleteBlog id={blog.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
