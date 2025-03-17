"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts } from "@/lib/GetProducts";
import Link from "next/link";
import { addToCart } from "@/lib/cartUtils";
export const FeaturedProductsSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      const latestProducts = products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFeaturedProducts(latestProducts);
    };
    fetchProducts();
  }, []);
  const handleAddToCart = async (productId) => {
    // setIsLoading(true);
    console.log("add to cart called");
    try {
      await addToCart(productId, 1);
      console.log("Product added to cart");
    } catch (error) {
    } finally {
      // setIsLoading(false);
    }
  };
  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Featured Products</h2>
          <Link href="/products">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white"
            >
              View All Kits
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              All Kits
            </TabsTrigger>
            <TabsTrigger
              value="easy"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Easy
            </TabsTrigger>
            <TabsTrigger
              value="medium"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              value="hard"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Hard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <Card
                  key={product._id}
                  className="bg-slate-800 border-slate-700 overflow-hidden hover:border-blue-500 transition-all"
                >
                  <Link href={`/product/${product._id}`}>
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 right-2 bg-blue-500 text-white hover:bg-blue-600">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-lg">
                          {product.name}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-slate-700 text-teal-300 border-teal-500 w-fit"
                      >
                        {product.difficulty}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <CardDescription className="text-gray-300 line-clamp-2">
                        {product.shortDescription}
                      </CardDescription>
                    </CardContent>
                  </Link>
                  <CardFooter className="flex justify-between items-center">
                    <p className="text-white font-bold">₹{product.price}</p>
                    <Button
                      onClick={() => handleAddToCart(product._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="easy" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts
                .filter((p) => p.difficulty.toLowerCase() === "easy")
                .slice(0, 4)
                .map((product) => (
                  <Card
                    key={product._id}
                    className="bg-slate-800 border-slate-700 overflow-hidden hover:border-blue-500 transition-all"
                  >
                    <Link href={`/product/${product._id}`}>
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 right-2 bg-blue-500 text-white hover:bg-blue-600">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">
                            {product.name}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-slate-700 text-teal-300 border-teal-500 w-fit"
                        >
                          {product.difficulty}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <CardDescription className="text-gray-300 line-clamp-2">
                          {product.shortDescription}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <p className="text-white font-bold">₹{product.price}</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Link>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="medium" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts
                .filter((p) => p.difficulty.toLowerCase() === "medium")
                .slice(0, 4)
                .map((product) => (
                  <Card
                    key={product._id}
                    className="bg-slate-800 border-slate-700 overflow-hidden hover:border-blue-500 transition-all"
                  >
                    <Link href={`/product/${product._id}`}>
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 right-2 bg-blue-500 text-white hover:bg-blue-600">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">
                            {product.name}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-slate-700 text-teal-300 border-teal-500 w-fit"
                        >
                          {product.difficulty}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <CardDescription className="text-gray-300 line-clamp-2">
                          {product.shortDescription}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <p className="text-white font-bold">₹{product.price}</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Link>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="hard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts
                .filter((p) => p.difficulty.toLowerCase() === "hard")
                .slice(0, 4)
                .map((product) => (
                  <Card
                    key={product._id}
                    className="bg-slate-800 border-slate-700 overflow-hidden hover:border-blue-500 transition-all"
                  >
                    <Link href={`/product/${product._id}`}>
                      <div className="relative">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 right-2 bg-blue-500 text-white hover:bg-blue-600">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">
                            {product.name}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-slate-700 text-teal-300 border-teal-500 w-fit"
                        >
                          {product.difficulty}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <CardDescription className="text-gray-300 line-clamp-2">
                          {product.shortDescription}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <p className="text-white font-bold">₹{product.price}</p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Link>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
