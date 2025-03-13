import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/HeroBottom";
import { ProjectGallerySection } from "@/components/ProjectGallerySection";
import Hero from "@/components/sections/hero/default";
import Navbar from "@/components/sections/navbar/default";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProductsSection />
      <ProjectGallerySection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
