"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Minus,
  Plus,
  Trash2,
  Tag,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "@/lib/cartUtils";

const CartPage = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const cart = await getCart();
      setCartItems(cart?.items || []);
      setError(null);
    } catch (err) {
      setError("Failed to load cart items");
      console.error("Error fetching cart items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const updatedCart = await updateCartItem(productId, newQuantity);
      setCartItems(updatedCart.items);
    } catch (err) {
      console.error("Error updating item quantity:", err);
      fetchCartItems();
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      const updatedCart = await increaseItemQuantity(productId);
      setCartItems(updatedCart.items);
    } catch (err) {
      console.error("Error increasing item quantity:", err);
      fetchCartItems();
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const updatedCart = await decreaseItemQuantity(productId);
      setCartItems(updatedCart.items);
    } catch (err) {
      console.error("Error decreasing item quantity:", err);
      fetchCartItems();
    }
  };

  const removeItem = async (productId) => {
    try {
      const updatedCart = await removeFromCart(productId);
      setCartItems(updatedCart.cart.items || []);
    } catch (err) {
      console.error("Error removing item:", err);
      fetchCartItems();
    }
  };

  const applyDiscount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code: discountCode }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setDiscountApplied(data.applied);
      fetchCartItems();
    } catch (err) {
      console.error("Error applying discount:", err);
    }
  };

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    fetchCartItems();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateSubtotal = (item) => {
    return (item.product.price * item.quantity).toFixed(2);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return discountApplied ? (total * 0.9).toFixed(2) : total.toFixed(2);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingAddress: {
            address: "123 St",
            city: "City",
            postalCode: "12345",
            country: "Country",
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error processing checkout:", err);
    }
  };

  const renderDesktopView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Image</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Subtotal</TableHead>
          <TableHead className="w-24 text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.tr
              key={item.product._id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="border-b"
            >
              <TableCell>
                <div className="h-24 w-24 rounded-md overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{item.product.name}</span>
                  <Badge variant="outline" className="w-fit mt-1">
                    {item.product.difficulty}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-center">
                ${item.product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDecreaseQuantity(item.product._id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleIncreaseQuantity(item.product._id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                <motion.div
                  key={item.quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ${calculateSubtotal(item)}
                </motion.div>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeItem(item.product._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );

  const renderMobileView = () => (
    <div className="space-y-4">
      <AnimatePresence>
        {cartItems.map((item) => (
          <motion.div
            key={item.product._id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <Badge variant="outline" className="mt-1">
                      {item.product.difficulty}
                    </Badge>
                    <div className="flex justify-between items-center mt-2">
                      <span>${item.product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            handleDecreaseQuantity(item.product._id)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            handleIncreaseQuantity(item.product._id)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <motion.div
                        key={item.quantity}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        Subtotal: ${calculateSubtotal(item)}
                      </motion.div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeItem(item.product._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">{error}</p>
        <Button onClick={fetchCartItems}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <ShoppingCart className="mr-2 h-6 w-6" />
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isDesktop ? renderDesktopView() : renderMobileView()}
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${calculateTotal()}</span>
                  </div>

                  {discountApplied && (
                    <motion.div
                      className="flex justify-between text-green-600"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <span>Discount (10%):</span>
                      <span>-${(calculateTotal() * 0.1).toFixed(2)}</span>
                    </motion.div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <motion.span
                      key={discountApplied ? "discounted" : "regular"}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ${calculateTotal()}
                    </motion.span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      onClick={applyDiscount}
                      disabled={discountApplied}
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      Apply
                    </Button>
                  </div>

                  {discountApplied && (
                    <motion.div
                      className="text-green-600 text-sm mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Discount code applied successfully!
                    </motion.div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-4">
            <ShoppingCart className="mx-auto h-12 w-12 opacity-30" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button>Continue Shopping</Button>
        </motion.div>
      )}
    </div>
  );
};

export default CartPage;
