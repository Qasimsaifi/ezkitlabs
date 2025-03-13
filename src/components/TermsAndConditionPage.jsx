"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Last Updated: 2 March, 2025
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Introduction */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Welcome to EZKIT Labs India! We provide affordable and
                  high-quality DIY electronics kits for smart home automation,
                  IoT, robotics, and other tech projects. Our mission is to
                  empower makers, hobbyists, and innovators across India by
                  offering accessible tools and resources to bring their ideas
                  to life.
                </p>
                <p className="text-muted-foreground">
                  These Terms & Conditions ("Terms") govern your use of our
                  website (ezkitlabs.co.in), products, and services. By
                  accessing or purchasing from EZKIT Labs India, you agree to be
                  bound by these Terms. Please read them carefully.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* User Agreement */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>2. User Agreement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="eligibility">
                    <AccordionTrigger>Eligibility</AccordionTrigger>
                    <AccordionContent>
                      Our website and services are available only to individuals
                      who are 18 years or older. By using EZKIT Labs India, you
                      represent that you meet this age requirement.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="responsibilities">
                    <AccordionTrigger>User Responsibilities</AccordionTrigger>
                    <AccordionContent>
                      You agree to use our platform responsibly, refraining from
                      illegal activities, unauthorized access, or distribution
                      of harmful content. You are responsible for all activity
                      under your account and must comply with applicable Indian
                      laws, including the Information Technology Act, 2000 and
                      Consumer Protection Act, 2019.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Ordering & Payments */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>3. Ordering & Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="payment-methods">
                    <AccordionTrigger>Payment Methods</AccordionTrigger>
                    <AccordionContent>
                      We accept payments via major credit/debit cards (Visa,
                      Mastercard, RuPay), UPI (BHIM, Google Pay, PhonePe), net
                      banking, and select digital wallets. All transactions are
                      processed securely in INR (₹). GST will be applicable as
                      per current government regulations.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="order-processing">
                    <AccordionTrigger>
                      Order Processing & Cancellations
                    </AccordionTrigger>
                    <AccordionContent>
                      Orders are processed within 1-2 business days.
                      Cancellations are accepted within 24 hours of purchase by
                      contacting support@ezkitlabs.co.in. Refunds for
                      cancellations will be processed within 7-10 business days
                      as per RBI guidelines. Tax invoices will be provided with
                      all purchases in compliance with GST regulations.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Shipping & Delivery */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>4. Shipping & Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="delivery-times">
                    <AccordionTrigger>Delivery Times</AccordionTrigger>
                    <AccordionContent>
                      Standard shipping within metro cities (Delhi NCR, Mumbai,
                      Bangalore, Chennai, Kolkata, Hyderabad) takes 2-3 business
                      days. Delivery to Tier 2 cities takes 3-5 business days,
                      and Tier 3 cities and remote areas take 5-7 business days.
                      Delays may occur during monsoon season or local festivals.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="international">
                    <AccordionTrigger>Delivery Partners</AccordionTrigger>
                    <AccordionContent>
                      We ship through trusted Indian courier partners including
                      Delhivery, BlueDart, DTDC, and India Post. Cash on
                      Delivery (COD) is available for orders under ₹5,000 in
                      select areas with a nominal convenience fee. Free shipping
                      on orders above ₹2,000.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Returns & Refunds */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>5. Returns & Refunds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="return-conditions">
                    <AccordionTrigger>Return Conditions</AccordionTrigger>
                    <AccordionContent>
                      Products may be returned within 7 days of delivery if
                      unused and in original packaging, in accordance with
                      Indian e-commerce regulations. Contact
                      support@ezkitlabs.co.in to initiate a return. Return
                      shipping costs are the customer's responsibility unless
                      the product is defective. No-questions-asked returns
                      available for orders made during special sales like
                      Republic Day, Independence Day, and Diwali promotions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="refund-process">
                    <AccordionTrigger>Refund Process</AccordionTrigger>
                    <AccordionContent>
                      Refunds are processed within 7-10 business days of
                      receiving the returned item as per RBI guidelines.
                      Eligible refunds will be credited to the original payment
                      method. For UPI transactions, refunds will be processed to
                      the linked bank account. Shipping costs are
                      non-refundable.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Warranty & Liability */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>6. Warranty & Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="warranty">
                    <AccordionTrigger>Product Warranty</AccordionTrigger>
                    <AccordionContent>
                      EZKIT Labs India offers a 6-month limited warranty on all
                      products against manufacturing defects, in compliance with
                      Indian Consumer Protection laws. Warranty claims require
                      proof of purchase and are subject to inspection. Service
                      centers are available in major cities across India.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="liability">
                    <AccordionTrigger>Limitation of Liability</AccordionTrigger>
                    <AccordionContent>
                      EZKIT Labs India is not liable for indirect, incidental,
                      or consequential damages arising from product use, to the
                      extent permissible under Indian Consumer Protection laws.
                      Our liability is limited to the purchase price of the
                      product or replacement, as applicable.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Privacy Policy & Data Usage */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>7. Privacy Policy & Data Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="data-collection">
                    <AccordionTrigger>Data Collection</AccordionTrigger>
                    <AccordionContent>
                      We collect personal information (name, email, shipping
                      address, phone number) to process orders and provide
                      support. Data is stored securely within India in
                      compliance with the Information Technology Act and
                      Personal Data Protection Bill guidelines. Your data is not
                      sold to third parties.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="third-party">
                    <AccordionTrigger>
                      Third-Party Integrations
                    </AccordionTrigger>
                    <AccordionContent>
                      We use analytics tools and payment processors that may
                      track user behavior. All payment gateways used are
                      RBI-compliant with two-factor authentication. See our{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      for details on NPCI and RBI compliance.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Amendments & Contact */}
          <motion.section variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>8. Amendments & Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="amendments">
                    <AccordionTrigger>Amendments</AccordionTrigger>
                    <AccordionContent>
                      We reserve the right to modify these Terms at any time.
                      Updates will be posted on this page, and continued use
                      constitutes acceptance of the new Terms. SMS notifications
                      may be sent for significant changes as per TRAI
                      guidelines.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="contact">
                    <AccordionTrigger>Contact Us</AccordionTrigger>
                    <AccordionContent>
                      For questions or concerns, reach us at:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Email: support@ezkitlabs.co.in</li>
                        <li>Phone: 1800-EZK-LABS (395-5227) (Toll-Free)</li>
                        <li>WhatsApp: +91 98765 43210</li>
                        <li>Hours: Mon-Sat, 10AM-7PM IST</li>
                        <li>
                          Registered Office: EZKIT Labs India Pvt. Ltd., 42,
                          Tech Park, Electronic City, Bangalore - 560100,
                          Karnataka, India
                        </li>
                        <li>GST: 29AADCE1234F1Z5</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>

          {/* Back to Home Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button asChild variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
