"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  CircuitBoard,
  Zap,
  Package,
  ArrowRight,
} from "lucide-react";

const Hero = () => {
  const floatingRef = useRef(null);

  useEffect(() => {
    const float = () => {
      const elements = document.querySelectorAll(".floating");
      elements.forEach((el, i) => {
        const speed = 1 + i * 0.1;
        el.style.transform = `translateY(${
          Math.sin((Date.now() / 1000) * speed) * 10
        }px)`;
      });
      requestAnimationFrame(float);
    };

    float();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white h-full">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-10 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl floating" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl floating" />
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-teal-500 rounded-full opacity-10 blur-xl floating" />
      </div>

      {/* Floating circuit elements */}
      <div className="absolute top-1/4 right-1/4 text-blue-300 opacity-30 floating">
        <CircuitBoard size={64} />
      </div>
      <div className="absolute bottom-1/4 left-1/5 text-teal-300 opacity-30 floating">
        <CircuitBoard size={48} />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white border-none">
              New Kits Available
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Build Tomorrow's Tech <span className="text-blue-400">Today</span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl">
              Affordable electronics project kits for students, hobbyists, and
              makers. Learn by building with high-quality components and
              step-by-step guides.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Shop Kits <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-500 text-white hover:text-white hover:border-blue-500 hover:bg-blue-600"
              >
                View Projects
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-400" size={20} />
                <span className="text-gray-300">Beginner-friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="text-green-400" size={20} />
                <span className="text-gray-300">Free shipping over ₹999</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 p-2 rounded-xl border border-slate-700 shadow-xl">
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full animate-pulse">
                Most Popular
              </div>
              <img
                src="https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg"
                alt="Arduino starter kit with components"
                className="rounded-lg w-full object-cover"
              />
            </div>

            {/* Floating indicator elements */}
            <div className="absolute -right-2 top-1/3 bg-blue-600 text-white p-3 rounded-full shadow-lg floating">
              <Zap size={24} />
            </div>
            <div
              className="absolute -left-2 bottom-1/4 bg-teal-500 text-white p-3 rounded-full shadow-lg floating"
              style={{ animationDelay: "0.5s" }}
            >
              <CircuitBoard size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
