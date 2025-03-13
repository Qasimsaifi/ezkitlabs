// pages/blog.tsx (or app/blog/page.tsx for App Router)
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const hoverVariants = {
  hover: { scale: 1.03, transition: { duration: 0.2 } },
};

// Mock Data (replace with API calls in production)
const articles = [
  {
    id: 1,
    title: "Build Your First Smart Home Hub",
    excerpt: "Learn to create a DIY hub with IoT integration.",
    date: "Feb 25, 2025",
    author: "Jane Doe",
    category: "Smart Home",
    image:
      "https://cdn.pixabay.com/photo/2018/10/28/17/35/smart-home-3779361_1280.jpg",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Intro to Robotics with Arduino",
    excerpt: "A beginner’s guide to robotic arms.",
    date: "Feb 20, 2025",
    author: "John Smith",
    category: "Robotics",
    image:
      "https://cdn.pixabay.com/photo/2018/10/28/17/35/smart-home-3779361_1280.jpg",
  },
  {
    id: 3,
    title: "IoT Weather Station Tutorial",
    excerpt: "Monitor weather with this simple project.",
    date: "Feb 15, 2025",
    author: "Alex Lee",
    category: "IoT",
    image:
      "https://cdn.pixabay.com/photo/2018/10/28/17/35/smart-home-3779361_1280.jpg",
  },
];

const projects = [
  {
    id: 1,
    title: "Automated Plant Watering System",
    user: "Mark T.",
    rating: 4.8,
    comments: 12,
    image:
      "https://cdn.pixabay.com/photo/2018/10/28/17/35/smart-home-3779361_1280.jpg",
  },
  {
    id: 2,
    title: "DIY Security Camera",
    user: "Sarah K.",
    rating: 4.5,
    comments: 8,
    image:
      "https://cdn.pixabay.com/photo/2018/10/28/17/35/smart-home-3779361_1280.jpg",
  },
];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  // Filter and sort logic (simplified for demo)
  const filteredArticles = articles
    .filter(
      (article) =>
        (category === "all" || article.category === category) &&
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sort === "latest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : 0
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary/10 py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-primary">
                Featured: Build Your First Smart Home Hub
              </h1>
              <p className="text-muted-foreground max-w-md">
                Discover how to create a DIY smart home hub with IoT integration
                in this step-by-step tutorial.
              </p>
              <Button asChild>
                <Link href={`/blog/${articles[0].id}`}>Read Now</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://cdn.pixabay.com/photo/2018/10/28/17/35/smart-home-3779361_1280.jpg"
                alt="Smart Home Hub"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="mt-8 max-w-lg mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search articles, tutorials, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-full"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Categories & Filters */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {[
              "All",
              "IoT",
              "Robotics",
              "Smart Home",
              "Beginner Projects",
              "Advanced Builds",
            ].map((cat) => (
              <Button
                key={cat}
                variant={category === cat.toLowerCase() ? "default" : "outline"}
                onClick={() => setCategory(cat.toLowerCase())}
              >
                {cat}
              </Button>
            ))}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>
      </section>

      {/* Article Listing Grid */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              whileHover="hover"
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="p-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-1 p-4">
                  <Badge className="mb-2">{article.category}</Badge>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-2">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {article.date} • {article.author}
                  </div>
                  <Button variant="link" asChild>
                    <Link href={`/blog/${article.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured & Popular Projects */}
      <section className="container mx-auto px-4 py-12 bg-muted/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Featured Community Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover="hover"
              >
                <Card>
                  <CardHeader className="p-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">
                      By {project.user}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>
                        {project.rating} ({project.comments} comments)
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full">
                      View Project
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Newsletter Signup CTA */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="bg-primary/10 rounded-lg p-8 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest articles, tutorials, and
            project ideas from EZKIT Labs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input placeholder="Enter your email" className="max-w-xs" />
            <Button>Subscribe</Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
