"use client";
import React, { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Github, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { register } from "@/lib/auth";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeUpdates, setAgreeUpdates] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState("");

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

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const renderPasswordStrength = () => {
    const levels = ["Weak", "Fair", "Good", "Strong"];
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-500",
    ];

    return (
      <div className="mt-2">
        <div className="flex justify-between mb-1">
          <span className="text-xs">
            {passwordStrength > 0 ? levels[passwordStrength - 1] : ""}
          </span>
          <span className="text-xs">
            {password.length > 0 ? `${passwordStrength}/4` : ""}
          </span>
        </div>
        <div className="w-full h-1 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              password.length > 0 ? colors[passwordStrength - 1] : ""
            }`}
            style={{ width: `${passwordStrength * 25}%` }}
          />
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      const user = await register(email, password, `${firstName} ${lastName}`);
      console.log("User registered:", user);
      // Redirect or show success message
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <motion.div variants={fadeIn} className="max-w-md w-full">
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
            Join EZKIT Labs
          </motion.h1>
          <motion.p className="text-sm mt-1" variants={fadeIn}>
            Create an account to start your DIY electronics journey
          </motion.p>
        </div>

        <motion.div variants={fadeIn}>
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {password && renderPasswordStrength()}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Passwords do not match</AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) =>
                        setAgreeTerms(checked === true)
                      }
                      className="mt-1"
                      required
                    />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <a href="#" className="underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="updates"
                      checked={agreeUpdates}
                      onCheckedChange={(checked) =>
                        setAgreeUpdates(checked === true)
                      }
                      className="mt-1"
                    />
                    <label htmlFor="updates" className="text-sm">
                      I'd like to receive DIY project ideas, tips, and special
                      offers
                    </label>
                  </div>
                </div>

                <motion.div
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                >
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </motion.div>
              </form>

              <div className="relative flex items-center justify-center mt-6">
                <Separator className="absolute w-full" />
                <span className="relative bg-white px-2 text-xs text-gray-500">
                  Or sign up with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <Github disabled className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-center">
                Already have an account?{" "}
                <a href="/login" className="underline font-medium">
                  Sign in
                </a>
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div className="text-center mt-8 space-y-2" variants={fadeIn}>
          <p className="text-sm">
            <span className="font-semibold">Join the EZKIT community</span> -
            Get access to exclusive tutorials, forums, and project guides
          </p>
          <p className="text-xs">
            We're committed to your privacy. EZKIT Labs uses the information you
            provide to contact you about our products and services. You may
            unsubscribe at any time.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
