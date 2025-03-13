"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  ArrowDown,
  Share2,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Dummy blog post data (replace with API fetch in real app)
const blogPost = {
  title: "Building a Smart Home with EZKIT Labs IoT Kit",
  author: "Jane Doe",
  publishedDate: "February 25, 2025",
  readingTime: "8 min read",
  coverImage:
    "https://cdn.pixabay.com/photo/2018/10/28/17/35/smart-home-3779361_1280.jpg",
  content: `
    <h2>Introduction</h2>
    <p>Welcome to EZKIT Labs! In this tutorial, we'll guide you through building a smart home automation system using our IoT kit.</p>
    <pre><code>const setup = () => { console.log("Hello, IoT!"); }</code></pre>
    <p><strong>Key Takeaway:</strong> Always test your circuits before deployment.</p>
    <img src="https://cdn.pixabay.com/photo/2019/04/15/12/23/internet-of-things-4129218_1280.jpg" alt="IoT Circuit" />
  `,
  tags: ["IoT", "Home Automation", "Arduino"],
  categories: ["Tutorials", "Projects"],
  relatedPosts: [
    { title: "Intro to Robotics with EZKIT", slug: "intro-to-robotics" },
    { title: "DIY Security System", slug: "diy-security-system" },
  ],
};

export default function BlogDetailsPage({ params }) {
  const [isTocOpen, setIsTocOpen] = useState(false);

  // Simulate fetching blog post data based on slug
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          {blogPost.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-muted-foreground mb-6">
          <p>
            By{" "}
            <span className="font-medium text-foreground">
              {blogPost.author}
            </span>{" "}
            • {blogPost.publishedDate} • {blogPost.readingTime}
          </p>
        </div>
        <Image
          src={blogPost.coverImage}
          alt={blogPost.title}
          width={1200}
          height={600}
          className="rounded-lg object-cover w-full h-64 md:h-96"
        />
      </motion.section>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Blog Content Area */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="col-span-3 prose prose-lg dark:prose-invert max-w-none"
        >
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </motion.div>

        {/* Table of Contents (Sidebar) */}
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-1 sticky top-20 h-fit hidden md:block"
        >
          <Card>
            <CardHeader>
              <CardTitle>Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#introduction" className="hover:underline">
                    Introduction
                  </Link>
                </li>
                <li>
                  <Link href="#setup" className="hover:underline">
                    Setup
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.aside>
      </div>

      {/* Tags & Categories */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mt-10"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {blogPost.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground">
          Categories:{" "}
          {blogPost.categories.map((category, idx) => (
            <span key={category}>
              <Link
                href={`/category/${category.toLowerCase()}`}
                className="hover:underline"
              >
                {category}
              </Link>
              {idx < blogPost.categories.length - 1 && ", "}
            </span>
          ))}
        </p>
      </motion.section>

      {/* Social Sharing & Engagement */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex gap-4 mt-6 items-center"
      >
        <Button variant="outline" size="icon" aria-label="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Bookmark">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Comment">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Comments Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mt-10"
      >
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-muted-foreground text-sm">
                    Great tutorial!
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="outline">Add a Comment</Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Related Posts */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mt-10"
      >
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPost.relatedPosts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
