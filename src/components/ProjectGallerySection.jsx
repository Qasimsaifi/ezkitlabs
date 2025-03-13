import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const ProjectGallerySection = () => {
  const projectGallery = [
    {
      id: 1,
      title: "Weather Station",
      creator: "Sarah Johnson",
      kit: "IoT Weather Kit",
      image:
        "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=1740",
      likes: 245,
    },
    {
      id: 2,
      title: "Smart Garden Monitor",
      creator: "Michael Chen",
      kit: "Arduino Garden Kit",
      image:
        "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=1740",
      likes: 182,
    },
    {
      id: 3,
      title: "LED Cube Display",
      creator: "Alex Rodriguez",
      kit: "LED Advanced Kit",
      image:
        "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=1740",
      likes: 327,
    },
    {
      id: 4,
      title: "Voice-Controlled Robot",
      creator: "Jamie Williams",
      kit: "Robotics Explorer Kit",
      image:
        "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=1740",
      likes: 201,
    },
    {
      id: 5,
      title: "Digital Smart Lock",
      creator: "Taylor Smith",
      kit: "Home Security Kit",
      image:
        "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=1740",
      likes: 156,
    },
    {
      id: 6,
      title: "Music Synthesizer",
      creator: "Jordan Lee",
      kit: "Audio Electronics Kit",
      image:
        "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?q=80&w=1740",
      likes: 289,
    },
  ];

  return (
    <section className="py-16 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Project Gallery
            </h2>
            <p className="text-gray-300 max-w-2xl">
              See what our community has built with EZKitLabs products
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white"
            >
              Submit Your Project
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View All Projects
            </Button>
          </div>
        </div>

        <Separator className="bg-slate-700 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectGallery.map((project) => (
            <Card
              key={project.id}
              className="bg-slate-900 border-slate-700 overflow-hidden hover:border-blue-500 transition-all"
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">By {project.creator}</p>
                  <Badge className="bg-teal-500 text-white hover:bg-teal-600">
                    {project.kit}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-slate-700 pt-3">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span className="text-gray-300">{project.likes}</span>
                </div>
                <Button
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-0 h-8 w-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
