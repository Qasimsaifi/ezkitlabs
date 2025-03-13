"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Check if already authenticated and redirect to dashboard
  useEffect(() => {
    isAuthenticated().then((auth) => {
      if (auth) router.back();
    });
  }, [router]);

  // Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include HttpOnly cookie
      });
      if (!res.ok) throw new Error((await res.json()).message);
      router.back();
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = () => {
    router.push("/api/auth/google");
  };

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const buttonHover = {
    rest: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center "
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <motion.div variants={fadeIn} className="max-w-md w-full">
        {/* Logo and welcome text */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="inline-flex items-center justify-center p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 18h-8a6 6 0 0 1 0-12h8" />
                <path d="M18 6v12" />
                <path d="M21 10h-4" />
                <path d="M21 14h-4" />
              </svg>
            </div>
          </motion.div>
          <motion.h1 className="text-2xl font-bold" variants={fadeIn}>
            Welcome to EZKIT Labs
          </motion.h1>
          <motion.p className="text-sm " variants={fadeIn}>
            Sign in to your account to access your projects and kits
          </motion.p>
        </div>

        <motion.div variants={fadeIn}>
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <a
                      href="/forgot-password"
                      className="text-xs hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10"
                  />
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked === true)
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <motion.div
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  className="pt-2"
                >
                  <Button type="submit" className="w-full h-10">
                    Sign In
                  </Button>
                </motion.div>
              </form> */}

              {/* {error && <p className="text-sm mt-2">{error}</p>}

              <div className="relative flex items-center justify-center my-6">
                <Separator className="absolute w-full" />
                <span className="relative px-2 bg-white text-black text-xs">
                  Or continue with
                </span>
              </div> */}

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled className="h-10">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="h-10"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
            {/* <CardFooter className="flex justify-center border-t pt-6">
              <p className="text-sm text-center">
                Don't have an account?{" "}
                <a href="/register" className="hover:underline font-medium">
                  Sign up
                </a>
              </p>
            </CardFooter> */}
          </Card>
        </motion.div>

        <motion.p className="text-xs text-center mt-8" variants={fadeIn}>
          By signing in, you agree to our{" "}
          <a href="#" className="hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
