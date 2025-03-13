"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function PrivacyPolicy() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-16 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          At EZKIT Labs, your privacy is our priority. We’re committed to
          transparency about how we collect, store, and use your data to bring
          you the best DIY electronics experience.
        </p>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Accordion type="single" collapsible className="space-y-4">
          {/* Section 1: Information We Collect */}
          <AccordionItem value="info-collect">
            <AccordionTrigger className="text-xl font-semibold">
              Information We Collect
            </AccordionTrigger>
            <AccordionContent>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <p className="text-muted-foreground">
                  We collect data to enhance your experience with EZKIT Labs:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <strong>Personal Details:</strong> Name, email, and shipping
                    address during account registration or checkout.
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Processed securely via
                    third-party gateways.
                  </li>
                  <li>
                    <strong>Browsing Behavior:</strong> Pages visited, products
                    viewed, and time spent, collected via cookies.
                  </li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Data is gathered through account creation, purchases, and
                  website interactions.
                </p>
              </motion.div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 2: How We Use Your Information */}
          <AccordionItem value="use-info">
            <AccordionTrigger className="text-xl font-semibold">
              How We Use Your Information
            </AccordionTrigger>
            <AccordionContent>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <p className="text-muted-foreground">
                  Your data helps us serve you better:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Order fulfillment and shipping updates.</li>
                  <li>Customer support and troubleshooting.</li>
                  <li>Personalized marketing (optional, with consent).</li>
                  <li>Analytics to improve our kits and services.</li>
                </ul>
                <p className="mt-2 font-semibold text-foreground">
                  We never sell or share your data without your permission.
                </p>
              </motion.div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 3: Data Protection & Security */}
          <AccordionItem value="data-protection">
            <AccordionTrigger className="text-xl font-semibold">
              Data Protection & Security
            </AccordionTrigger>
            <AccordionContent>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <p className="text-muted-foreground">
                  We safeguard your data with:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>End-to-end encryption for sensitive information.</li>
                  <li>Secure payment processing compliant with PCI-DSS.</li>
                  <li>Regular security audits and updates.</li>
                </ul>
                <p className="mt-2">
                  We comply with GDPR, CCPA, and other relevant laws.
                </p>
              </motion.div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 4: Cookies & Tracking */}
          <AccordionItem value="cookies">
            <AccordionTrigger className="text-xl font-semibold">
              Cookies & Tracking Technologies
            </AccordionTrigger>
            <AccordionContent>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <p className="text-muted-foreground">
                  Cookies help us enhance your experience:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Analytics to understand site usage.</li>
                  <li>Personalization of product recommendations.</li>
                  <li>Targeted ads (optional, with consent).</li>
                </ul>
                <p className="mt-2">
                  Manage your preferences via the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Cookie Settings
                  </a>{" "}
                  link.
                </p>
              </motion.div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 5: Third-Party Services */}
          <AccordionItem value="third-party">
            <AccordionTrigger className="text-xl font-semibold">
              Third-Party Services
            </AccordionTrigger>
            <AccordionContent>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <p className="text-muted-foreground">
                  We partner with trusted services like:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Stripe and PayPal for payments.</li>
                  <li>Google Analytics for site insights.</li>
                  <li>Shipping providers for order delivery.</li>
                </ul>
                <p className="mt-2">
                  These partners adhere to strict privacy standards—refer to
                  their policies for details.
                </p>
              </motion.div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 6: User Rights & Control */}
          <AccordionItem value="user-rights">
            <AccordionTrigger className="text-xl font-semibold">
              User Rights & Control
            </AccordionTrigger>
            <AccordionContent>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <p className="text-muted-foreground">You can:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Access or update your data in your account.</li>
                  <li>Request data deletion via support.</li>
                  <li>Opt out of marketing emails via the unsubscribe link.</li>
                  <li>Disable tracking in Cookie Settings.</li>
                </ul>
              </motion.div>
            </AccordionContent>
          </AccordionItem>

          {/* Section 7: Policy Updates & Contact */}
          <AccordionItem value="updates-contact">
            <AccordionTrigger className="text-xl font-semibold">
              Policy Updates & Contact Information
            </AccordionTrigger>
            <AccordionContent>
              <motion.div variants={fadeIn} initial="hidden" animate="visible">
                <p className="text-muted-foreground">
                  This policy may evolve. We’ll notify you of changes via email
                  or a website banner.
                </p>
                <p className="mt-2">
                  Questions? Reach out at{" "}
                  <a
                    href="mailto:privacy@ezkitlabs.com"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4" /> privacy@ezkitlabs.com
                  </a>
                </p>
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
