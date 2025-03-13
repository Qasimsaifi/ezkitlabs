"use client";
// AboutPage.jsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronRight } from "lucide-react";

export default function AboutPage() {
  const [hoveredTeamMember, setHoveredTeamMember] = useState(null);

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Electronics engineer with 10+ years experience in IoT and smart home solutions.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      name: "Maya Patel",
      role: "Head of Product",
      bio: "Former educator passionate about making technology accessible to all skill levels.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      name: "Jamal Wilson",
      role: "Lead Engineer",
      bio: "Robotics specialist focused on creating intuitive, beginner-friendly kits.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      name: "Sofia Garcia",
      role: "Community Manager",
      bio: "Maker community advocate who ensures our users get the support they need.",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Welcome to <span className="font-bold">EZKIT</span> Labs
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Making DIY electronics accessible, affordable, and
              beginner-friendly for everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Explore Our Kits</Button>
              <Button size="lg" variant="outline">
                Join Our Community
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='currentColor' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </section>

      {/* What is EZKITs Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What is EZKITs?</h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary/10 text-primary mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Guides</h3>
              <p className="text-muted-foreground">
                Step-by-step instructions designed for beginners with clear
                explanations and troubleshooting tips.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary/10 text-primary mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Pre-tested Components
              </h3>
              <p className="text-muted-foreground">
                Every component is quality-checked and guaranteed to work,
                eliminating frustrating compatibility issues.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-primary/10 text-primary mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Join our active community of makers who share ideas,
                troubleshoot together, and celebrate each other's projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-lg opacity-10"></div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Democratizing Electronics Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      We believe everyone should have the opportunity to learn
                      and create with electronics, regardless of their
                      background or budget. Our mission is to break down
                      barriers to entry by providing affordable, high-quality
                      kits that make learning enjoyable.
                    </p>
                    <p className="text-muted-foreground">
                      By 2030, we aim to reach 1 million new makers worldwide,
                      empowering the next generation of inventors, thinkers, and
                      problem-solvers.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-secondary rounded-lg opacity-10"></div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Affordability Without Compromise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Our direct sourcing relationships and optimized supply
                      chain allow us to offer premium quality at accessible
                      prices. We cut out middlemen, not corners.
                    </p>
                    <p className="text-muted-foreground">
                      Every component is carefully selected and tested to ensure
                      reliability while remaining cost-effective. We're proud
                      that our kits typically cost 30-50% less than comparable
                      options without sacrificing quality.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind EZKIT Labs are makers, educators, and
              electronics enthusiasts committed to sharing their knowledge and
              expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="transition-transform duration-300 hover:-translate-y-2"
                onMouseEnter={() => setHoveredTeamMember(index)}
                onMouseLeave={() => setHoveredTeamMember(null)}
              >
                <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ${
                        hoveredTeamMember === index
                          ? "opacity-100"
                          : "opacity-70"
                      }`}
                    ></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm font-medium opacity-90">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center gap-2 pt-0 pb-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
