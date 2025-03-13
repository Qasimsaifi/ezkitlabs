"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      error: false,
      message: "Thank you for your message! We'll get back to you shortly.",
    });

    // Reset form after submission
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "What are your business hours?",
      answer:
        "Our support team is available Monday through Friday from 9:00 AM to 6:00 PM EST. For urgent matters outside these hours, please email us and we'll respond as soon as possible.",
    },
    {
      question: "How quickly can I expect a response?",
      answer:
        "We strive to respond to all inquiries within 24 business hours. For complex issues that require more investigation, we'll send you an initial acknowledgment and follow up with a detailed response.",
    },
    {
      question: "Do you offer in-person consultations?",
      answer:
        "Yes, we offer in-person consultations at our main office by appointment only. Please contact us at least 48 hours in advance to schedule a meeting with our team.",
    },
    {
      question: "How can I report a technical issue?",
      answer:
        "Technical issues can be reported through this contact form by selecting 'Technical Support' in the subject field. For faster resolution, please include details about your device, browser, and steps to reproduce the issue.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              We'd love to hear from you. Whether you have a question about our
              services, need technical support, or just want to say hello, we're
              here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              className="md:col-span-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {formStatus.submitted ? (
                    <motion.div
                      className="bg-primary/10 text-primary p-6 rounded-lg text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="font-medium">{formStatus.message}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          className="transition duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          className="transition duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is this regarding?"
                          value={formState.subject}
                          onChange={handleInputChange}
                          required
                          className="transition duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="How can we help you?"
                          rows={5}
                          value={formState.message}
                          onChange={handleInputChange}
                          required
                          className="resize-none transition duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" className="w-full font-medium">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="md:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Alternative Ways to Reach Us</CardTitle>
                  <CardDescription>
                    Choose the method that works best for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-muted-foreground">
                        <a
                          href="mailto:hello@company.com"
                          className="hover:underline"
                        >
                          hello@company.com
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        For general inquiries and support
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+1234567890" className="hover:underline">
                          +1 (234) 567-890
                        </a>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday-Friday, 9AM-6PM EST
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Visit Us</h3>
                      <p className="text-muted-foreground">
                        123 Innovation Street
                        <br />
                        Tech District, NY 10001
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Appointment required for in-person meetings
                      </p>
                    </div>
                  </motion.div>
                </CardContent>

                <CardFooter className="border-t pt-6 flex justify-center">
                  <Button variant="outline">View on Map</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Find quick answers to common questions about contacting us and
                our response process.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
