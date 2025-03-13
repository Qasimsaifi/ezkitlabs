"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Search,
  Phone,
  Mail,
  FileText,
  Users,
  ArrowRight,
} from "lucide-react";

const SupportPage = () => {
  const [selectedTab, setSelectedTab] = useState("contact");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">
              EZKIT Labs Support
            </h1>
            <Button variant="outline" className="hidden md:flex gap-2">
              <Phone className="h-4 w-4" />
              <span>Call Us: 1-800-EZKIT</span>
            </Button>
          </div>
          <p className="text-muted-foreground max-w-2xl mb-8">
            Get assistance with your DIY electronics kits for smart home
            automation, IoT, robotics, and other tech projects.
          </p>
          <div className="relative max-w-lg">
            <Input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              className="pl-10 pr-4 h-12 rounded-full"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs
          defaultValue="contact"
          className="w-full"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mb-8">
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Contact Support Tab */}
          <TabsContent value="contact">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                      Fill out the form below and our support team will get back
                      to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="support-category"
                          className="text-sm font-medium"
                        >
                          Support Category
                        </label>
                        <Select>
                          <SelectTrigger id="support-category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order">Order Issues</SelectItem>
                            <SelectItem value="product">
                              Product Inquiry
                            </SelectItem>
                            <SelectItem value="technical">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="general">
                              General Queries
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="Briefly describe your issue"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your inquiry or issue"
                          rows="5"
                        />
                      </div>
                      <Button type="submit" className="w-full md:w-auto">
                        Submit Request
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="md:col-span-1 space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Chat Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Chat with our support team in real-time during business
                        hours (Mon-Fri, 9AM-5PM PST)
                      </p>
                      <Button variant="outline" className="w-full">
                        Start Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Other Contact Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-muted-foreground">
                            1-800-EZKIT (395485)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Mon-Fri, 9AM-5PM PST
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            support@ezkitlabs.com
                          </p>
                          <p className="text-xs text-muted-foreground">
                            24-48hr response time
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants} className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>FAQ Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Badge className="mr-2">12</Badge> Ordering & Payment
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Badge className="mr-2">8</Badge> Shipping & Delivery
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Badge className="mr-2">15</Badge> Product Usage
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Badge className="mr-2">10</Badge> Returns & Refunds
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Badge className="mr-2">7</Badge> Technical Issues
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>
                      Browse the most common questions about our DIY electronics
                      kits
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          How long does shipping take?
                        </AccordionTrigger>
                        <AccordionContent>
                          Standard shipping typically takes 3-5 business days
                          within the continental US. International shipping
                          times vary by location, generally taking 7-14 business
                          days. Expedited shipping options are available at
                          checkout for faster delivery.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          What's included in each DIY kit?
                        </AccordionTrigger>
                        <AccordionContent>
                          Each EZKIT Labs DIY kit includes all necessary
                          electronic components, a detailed instruction manual,
                          access to online video tutorials, and a
                          troubleshooting guide. Some advanced kits may require
                          basic tools like a soldering iron, which are noted in
                          the product description.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          What if I'm missing a component in my kit?
                        </AccordionTrigger>
                        <AccordionContent>
                          If you're missing any components, please contact our
                          support team with your order number and a description
                          of the missing items. We'll ship replacement parts at
                          no additional cost. You can submit a request through
                          our contact form or email support@ezkitlabs.com.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          What skill level is required for your kits?
                        </AccordionTrigger>
                        <AccordionContent>
                          Our kits range from beginner (no prior experience
                          needed) to advanced (some electronics knowledge
                          helpful). Each product page clearly indicates the
                          recommended skill level. Our beginner kits include
                          extra detailed instructions and require no soldering,
                          making them perfect for first-time makers.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>
                          Do you offer refunds if I can't complete my project?
                        </AccordionTrigger>
                        <AccordionContent>
                          We stand behind our products with a 30-day
                          satisfaction guarantee. If you're unable to complete
                          your project despite following the instructions,
                          please contact support for troubleshooting assistance.
                          If we can't resolve the issue, we'll process a full
                          refund or exchange.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              <motion.div variants={itemVariants} className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Smart Home Kits
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        IoT Projects
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Robotics Kits
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Arduino Projects
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Raspberry Pi Projects
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-9">
                <Card>
                  <CardHeader>
                    <CardTitle>Help Center & Documentation</CardTitle>
                    <CardDescription>
                      Guides, manuals, and troubleshooting articles for all
                      EZKIT Labs products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              Getting Started Guides
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Setup instructions and first steps
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Product Manuals</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Detailed instructions for all kits
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Troubleshooting</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Solutions for common issues
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Code Examples</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sample code for various projects
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Video Tutorials</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Step-by-step visual guides
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Project Ideas</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Inspiration for your next build
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">
                        Popular Documentation
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>Smart Home Hub - Complete Setup Guide</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              Troubleshooting Arduino Connection Issues
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>Beginner's Guide to Soldering</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Community Forums</CardTitle>
                    <CardDescription>
                      Join our thriving community of makers to share ideas, get
                      help, and showcase your projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">EZKIT Labs Forum</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Our official forum with dedicated sections for each
                            product category
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">10k+ members</Badge>
                            <Badge variant="outline">50+ daily posts</Badge>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3">
                            Visit Forum
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Discord Community</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Real-time chat with fellow makers and occasional
                            live events with our team
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">5k+ members</Badge>
                            <Badge variant="outline">Active 24/7</Badge>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3">
                            Join Discord
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Reddit Community</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Share your builds, ask questions, and discuss ideas
                            with fellow enthusiasts
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">r/EZKITLabs</Badge>
                            <Badge variant="outline">15k+ members</Badge>
                          </div>
                          <Button variant="outline" size="sm" className="mt-3">
                            Visit Subreddit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default SupportPage;
