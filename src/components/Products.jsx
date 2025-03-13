"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, ChevronDown, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getProducts, getSingleProduct } from "@/lib/GetProducts";
import Link from "next/link";
import { addToCart } from "@/lib/cartUtils";

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = async (productId) => {
    try {
      console.log("productId: " + productId);
      await addToCart(productId.toString(), 1);
    } catch (error) {
      // toast.error(error.message);
    }
  };
  // Get filters from URL or set defaults
  const getInitialFilters = () => {
    if (!router.isReady) return {};

    return {
      searchQuery: router.query.search || "",
      categoryFilter: router.query.category || "all",
      minPrice: parseInt(router.query.minPrice || "0", 10),
      maxPrice: parseInt(router.query.maxPrice || "200", 10),
      sortBy: router.query.sort || "popularity",
      page: parseInt(router.query.page || "1", 10),
    };
  };

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Initialize filters from URL once router is ready
  useEffect(() => {
    if (router.isReady && !isInitialized) {
      const initialFilters = getInitialFilters();
      setSearchQuery(initialFilters.searchQuery);
      setCategoryFilter(initialFilters.categoryFilter);
      setPriceRange([initialFilters.minPrice, initialFilters.maxPrice]);
      setSortBy(initialFilters.sortBy);
      setCurrentPage(initialFilters.page);
      setIsInitialized(true);
    }
  }, [router.isReady, isInitialized, router.query]);

  // Update URL when filters change
  useEffect(() => {
    if (router.isReady && isInitialized) {
      const query = {
        ...(searchQuery && { search: searchQuery }),
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(priceRange[0] > 0 && { minPrice: priceRange[0].toString() }),
        ...(priceRange[1] < 200 && { maxPrice: priceRange[1].toString() }),
        ...(sortBy !== "popularity" && { sort: sortBy }),
        ...(currentPage > 1 && { page: currentPage.toString() }),
      };

      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [
    searchQuery,
    categoryFilter,
    priceRange,
    sortBy,
    currentPage,
    isInitialized,
    router.isReady,
  ]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts();
        const mappedProducts = data.map((product) => ({
          id: product._id,
          title: product.name,
          description: product.shortDescription,
          price: product.price,
          image: product.images[0],
          category: mapDifficultyToCategory(product.difficulty),
          popularity: calculatePopularity(product),
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const mapDifficultyToCategory = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "iot";
      case "medium":
        return "smart-home";
      case "hard":
        return "robotics";
      default:
        return "iot";
    }
  };

  // Calculate a popularity score based on product attributes
  const calculatePopularity = (product) => {
    // This is a simple example, adjust based on what makes sense for your app
    // Maybe use review count, rating, or completionTime
    const basePopularity = 70;

    // Add points based on specifications count
    const specPoints = (product.specifications?.length || 0) * 2;

    // Add points based on features count
    const featurePoints = (product.features?.length || 0) * 3;

    // Add points based on reviews
    const reviewPoints = (product.reviews?.length || 0) * 5;

    return basePopularity + specPoints + featurePoints + reviewPoints;
  };

  // Filter and sort products
  useEffect(() => {
    if (!products.length) return;

    let results = [...products];

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      results = results.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Filter by price range
    results = results.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        results.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }

    setFilteredProducts(results);

    // Reset to page 1 if filters change but not when initializing from URL
    if (isInitialized && currentPage > 1 && results.length <= productsPerPage) {
      setCurrentPage(1);
    }
  }, [
    products,
    searchQuery,
    categoryFilter,
    priceRange,
    sortBy,
    isInitialized,
  ]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // URL updates are handled in the useEffect
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Page change handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        EZKIT Labs Products
      </h1>

      {/* Search and filters */}
      <div className="mb-8">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="smart-home">Smart Home</SelectItem>
                  <SelectItem value="iot">IoT</SelectItem>
                  <SelectItem value="robotics">Robotics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={5}
            value={priceRange}
            onValueChange={setPriceRange}
            className="max-w-lg"
          />
        </div>
      </div>

      {/* Loading spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      <div className="overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 pb-4 flex-grow">
                        <p className="text-xl font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Link>
                    <CardFooter>
                      <Button
                        className="w-full gap-2"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) paginate(currentPage - 1);
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {[...Array(totalPages).keys()].map((number) => (
                    <PaginationItem key={number + 1}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          paginate(number + 1);
                        }}
                        isActive={currentPage === number + 1}
                      >
                        {number + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) paginate(currentPage + 1);
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
