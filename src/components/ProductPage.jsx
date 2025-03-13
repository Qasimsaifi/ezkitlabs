"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Head from "next/head";
import {
  StarIcon,
  CheckCircle,
  Truck,
  Clock,
  Users,
  Shield,
} from "lucide-react";
import { addToCart } from "@/lib/cartUtils";
// import toast from "react-hot-toast";

const ProductPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
    } catch (error) {
      // toast.error(error.message);
    }
  };

  // SEO: Generate structured data for the product
  const generateProductSchema = () => {
    if (!product) return null;

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      description: product.shortDescription,
      image: product.images[0],
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: product.price,
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue:
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length,
        reviewCount: product.reviews.length,
      },
      review: product.reviews.map((review) => ({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
        },
        author: {
          "@type": "Person",
          name: review.name,
        },
        datePublished: review.date,
      })),
    };

    return JSON.stringify(schema);
  };

  // SEO: Update page title and metadata based on product
  useEffect(() => {
    if (product) {
      // Update document title dynamically for SEO
      document.title = `${product.name} | Your Store Name`;
    }
  }, [product]);

  // Framer motion variants
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slideUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonHover = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <StarIcon
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "fill-current" : "stroke-current"
          }`}
          aria-hidden={true}
        />
      ));
  };

  // Calculate average rating
  const averageRating =
    product?.reviews?.reduce((acc, review) => acc + review.rating, 0) /
      product?.reviews?.length || 0;

  // Show message if product is not found
  if (!product) {
    return <div className="text-center py-12">Product not found.</div>;
  }

  return (
    <>
      {/* SEO: Add metadata tags */}

      <Head>
        <title>{`${product.name} | Your Store Name`}</title>
        <meta name="description" content={product.shortDescription} />
        <meta
          name="keywords"
          content={`${product.name}, ${product.badge || ""}, DIY kit, hobby, ${
            product.difficulty
          }`}
        />

        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:price:amount" content={product.price} />
        <meta property="og:price:currency" content="USD" />
        <meta property="og:availability" content="instock" />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="product" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.shortDescription} />
        <meta name="twitter:image" content={product.images[0]} />

        {/* Canonical URL to prevent duplicate content issues */}
        <link
          rel="canonical"
          href={`https://yourstore.com/products/${product.id}`}
        />

        {/* Structured data for rich snippets */}
        <script type="application/ld+json">{generateProductSchema()}</script>
      </Head>

      <motion.div
        className="container mx-auto px-4 py-12"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        {/* Breadcrumbs for SEO and UX */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex text-sm">
            <li className="breadcrumb-item">
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li className="mx-2">/</li>
            <li className="breadcrumb-item">
              <a href="/category" className="hover:underline">
                Category
              </a>
            </li>
            <li className="mx-2">/</li>
            <li className="breadcrumb-item font-medium" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <motion.div variants={fadeIn} className="relative">
            {product.badge && (
              <Badge className="absolute top-4 left-4 z-10">
                {product.badge}
              </Badge>
            )}
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <motion.div
                      className="p-1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img
                            src={image}
                            alt={`${product.name} - detailed view ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                            loading={index === 0 ? "eager" : "lazy"}
                            width="600"
                            height="600"
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={staggerChildren}
            className="flex flex-col justify-center"
          >
            <motion.div variants={slideUp}>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg mb-4">{product.shortDescription}</p>
            </motion.div>

            <motion.div variants={slideUp} className="flex items-center mb-4">
              <div
                className="flex mr-2"
                aria-label={`${averageRating.toFixed(1)} out of 5 stars`}
              >
                {renderStars(averageRating)}
              </div>
              <span className="text-sm">
                ({product.reviews.length} reviews)
              </span>
            </motion.div>

            <motion.div variants={slideUp} className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold" itemProp="price">
                  ${product.price}
                </span>
                {product.discount && (
                  <span className="text-lg line-through ml-2">
                    ${product.discount}
                  </span>
                )}
                {product.discount && (
                  <Badge variant="outline" className="ml-2">
                    Save ${(product.discount - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={slideUp}
              className="flex flex-col space-y-3 mb-6"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>In Stock - Ships within 24 hours</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>Project completion time: {product.completionTime}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>Difficulty level: {product.difficulty}</span>
              </div>
            </motion.div>

            {/* Quantity selector */}
            <motion.div variants={slideUp} className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 border-r"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 border-l"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </motion.div>

            {/* Add to cart button */}
            <motion.div
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
              className="mb-6"
            >
              <Button className="w-full py-6" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={slideUp}
              className="grid grid-cols-2 gap-2 mt-4"
            >
              <div className="flex items-center border rounded p-2">
                <Shield className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="text-sm">30-day satisfaction guarantee</span>
              </div>
              <div className="flex items-center border rounded p-2">
                <Users className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="text-sm">Community support included</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Detailed Product Information Section */}
        <motion.div variants={fadeIn} className="mb-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="whatsIncluded">What's Included</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="p-4">
              <h2 className="text-xl font-bold mb-4 sr-only">
                Product Specifications
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="features" className="p-4">
              <h2 className="text-xl font-bold mb-4 sr-only">
                Product Features
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="whatsIncluded" className="p-4">
              <h2 className="text-xl font-bold mb-4 sr-only">
                What's Included
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {product.inTheBox.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Product Description - Added for SEO */}
        <motion.div variants={fadeIn} className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Product Description</h2>
          <div className="prose max-w-none" itemProp="description">
            <p>{product.longDescription || product.shortDescription}</p>
            {/* More detailed content would go here */}
          </div>
        </motion.div>

        {/* Customer Reviews Section */}
        <motion.div variants={fadeIn} className="mb-16">
          <h2 className="text-2xl font-bold mb-6" id="reviews">
            Customer Reviews
          </h2>

          {/* Review summary */}
          <div className="flex flex-wrap items-center mb-8">
            <div className="mr-8 mb-4">
              <span className="text-4xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <div
                className="flex mt-1"
                aria-label={`${averageRating.toFixed(1)} out of 5 stars`}
              >
                {renderStars(averageRating)}
              </div>
              <span className="text-sm">
                Based on {product.reviews.length} reviews
              </span>
            </div>
            <div className="flex-1 min-w-72">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = product.reviews.filter(
                  (r) => r.rating === star
                ).length;
                const percentage = (
                  (count / product.reviews.length) *
                  100
                ).toFixed(0);

                return (
                  <div key={star} className="flex items-center mb-1">
                    <span className="w-12 text-sm">{star} stars</span>
                    <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                      <div
                        className="bg-gray-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                        aria-label={`${percentage}% of reviews are ${star} stars`}
                      ></div>
                    </div>
                    <span className="w-8 text-sm text-right">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review list */}
          <div className="space-y-6 mb-8">
            {product.reviews.map((review) => (
              <motion.div
                key={review.id}
                className="border-b pb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                itemScope
                itemType="https://schema.org/Review"
              >
                <meta itemProp="itemReviewed" content={product.name} />
                <div className="flex items-center mb-2">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {review.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium" itemProp="author">
                        {review.name}
                      </h4>
                      {review.verified && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div
                        className="flex mr-2"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {renderStars(review.rating)}
                      </div>
                      <meta itemProp="reviewRating" content={review.rating} />
                      <span className="text-xs" itemProp="datePublished">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2" itemProp="reviewBody">
                  {review.comment}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Write a review form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="rating">
                Your Rating
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="mr-1"
                    aria-label={`Rate ${star} stars`}
                    id={`star-${star}`}
                  >
                    <StarIcon className="w-6 h-6 stroke-current" />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="review-text">
                Your Review
              </label>
              <Textarea
                id="review-text"
                placeholder="Share your experience with this product..."
                className="h-32"
                aria-label="Review text"
              />
            </div>
            <motion.div
              variants={buttonHover}
              initial="rest"
              whileHover="hover"
            >
              <Button>Submit Review</Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Related Products Section */}
        <motion.div
          variants={fadeIn}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                itemScope
                itemType="https://schema.org/Product"
              >
                <meta itemProp="name" content={item.name} />
                <meta itemProp="price" content={item.price} />
                <Card className="overflow-hidden h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={`${item.name} - related product`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        width="300"
                        height="200"
                        itemProp="image"
                      />
                      <Badge className="absolute top-2 right-2">
                        {item.difficulty}
                      </Badge>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <div className="mt-auto pt-2">
                        <p className="font-bold">${item.price}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          aria-label={`View details of ${item.name}`}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProductPage;
