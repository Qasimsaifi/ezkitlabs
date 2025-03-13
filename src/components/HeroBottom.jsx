import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cpu,
  CircuitBoard,
  BookOpen,
  Lightbulb,
  Zap,
  ShieldCheck,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            Why Choose EZKitLabs?
          </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Our electronic project kits are designed to make learning
            electronics fun, accessible, and affordable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-900/50 p-4 rounded-full mb-4">
                  <CircuitBoard className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Quality Components
                </h3>
                <p className="text-gray-300">
                  Every kit contains high-quality components that are pre-tested
                  and ready to use, ensuring successful project completion.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card 2 */}
          <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-900/50 p-4 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Detailed Guides
                </h3>
                <p className="text-gray-300">
                  Step-by-step instructions with illustrated diagrams make it
                  easy for beginners to follow along and learn.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card 3 */}
          <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-teal-900/50 p-4 rounded-full mb-4">
                  <Cpu className="h-8 w-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Beginner to Advanced
                </h3>
                <p className="text-gray-300">
                  Projects ranging from simple LED circuits to complex
                  microcontroller-based systems for all skill levels.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card 4 */}
          <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-900/50 p-4 rounded-full mb-4">
                  <Lightbulb className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Educational Focus
                </h3>
                <p className="text-gray-300">
                  Each kit includes theory explanations so you understand not
                  just how, but why your circuit works.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card 5 */}
          <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-900/50 p-4 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Budget-Friendly
                </h3>
                <p className="text-gray-300">
                  Affordable kits that don't compromise on quality, perfect for
                  schools, clubs, and individual learners.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card 6 */}
          <Card className="bg-slate-800 border-slate-700 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-900/50 p-4 rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Community Support
                </h3>
                <p className="text-gray-300">
                  Join our growing community of makers for troubleshooting help,
                  project ideas, and shared experiences.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
            <p className="text-4xl font-bold text-blue-400">50+</p>
            <p className="text-gray-300 mt-2">Project Kits</p>
          </div>
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
            <p className="text-4xl font-bold text-purple-400">10K+</p>
            <p className="text-gray-300 mt-2">Happy Makers</p>
          </div>
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
            <p className="text-4xl font-bold text-teal-400">4.9</p>
            <p className="text-gray-300 mt-2">Average Rating</p>
          </div>
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
            <p className="text-4xl font-bold text-blue-400">24h</p>
            <p className="text-gray-300 mt-2">Support Response</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
