"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Loader2,
  CreditCard,
  Truck,
  Plus,
  Minus,
  Check,
  Home,
  Building2,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCart } from "@/lib/cartUtils";
import { addressApi, validateAddress, indianStates } from "@/lib/addressApi";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(40);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch cart and addresses when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Starting data fetch");

        // Fetch cart items
        console.log("Fetching cart data");
        const cartResponse = await getCart();
        console.log("Cart response received:", cartResponse);

        // Safely handle cart data
        let cartItems = [];
        if (cartResponse) {
          if (Array.isArray(cartResponse)) {
            cartItems = cartResponse;
          } else if (typeof cartResponse === "object") {
            cartItems = cartResponse.items || [];
          }
        }
        console.log("Processed cart items:", cartItems);

        // Set cart state with safely processed data
        setCart(cartItems);

        // Safely calculate subtotal
        console.log("Calculating subtotal");
        let calculatedSubtotal = 0;
        if (Array.isArray(cartItems) && cartItems.length > 0) {
          calculatedSubtotal = cartItems.reduce((total, item) => {
            const price =
              item && typeof item.product.price === "number"
                ? item.product.price
                : 0;
            const quantity =
              item && typeof item.quantity === "number" ? item.quantity : 0;
            return total + price * quantity;
          }, 0);
        }
        console.log("Calculated subtotal:", calculatedSubtotal);
        setSubtotal(calculatedSubtotal);

        // Calculate discount
        console.log("Calculating discount");
        const calculatedDiscount = calculatedSubtotal > 15000 ? 1000 : 0;
        console.log("Calculated discount:", calculatedDiscount);
        setDiscount(calculatedDiscount);

        // Calculate total
        console.log("Calculating total with shipping:", shipping);
        const calculatedTotal =
          calculatedSubtotal + (shipping || 0) - calculatedDiscount;
        console.log("Calculated total:", calculatedTotal);
        setTotal(calculatedTotal);

        // Fetch user addresses
        console.log("Fetching addresses");
        const addressResponse = await addressApi.getAllAddresses();
        console.log("Address response received:", addressResponse);

        // Safely process address data
        if (addressResponse === undefined || addressResponse === null) {
          console.log("Address response is undefined or null");
          setAddresses([]);
        } else if (!Array.isArray(addressResponse)) {
          console.log(
            "Address response is not an array:",
            typeof addressResponse
          );
          setAddresses([]);
        } else {
          console.log(
            "Setting addresses array of length:",
            addressResponse.length
          );
          setAddresses(addressResponse);

          // Only try to set selected address if we have valid addresses
          if (addressResponse.length > 0) {
            const firstAddress = addressResponse[0];
            console.log("First address:", firstAddress);

            if (firstAddress && firstAddress._id) {
              console.log("Setting selected address ID:", firstAddress._id);
              setSelectedAddressId(firstAddress._id);
            } else {
              console.log("First address does not have _id property");
            }
          } else {
            console.log("No addresses available");
          }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        // Initialize with empty values in case of error
        setCart([]);
        setSubtotal(0);
        setDiscount(0);
        setTotal(shipping || 0);
        setAddresses([]);
      }
    };

    console.log("UseEffect running");
    fetchData();
  }, [shipping]);

  const updateQuantity = async (id, change) => {
    try {
      // Update cart item quantity
      const updatedCart = cart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
      setCart(updatedCart);

      // Recalculate totals
      const newSubtotal = updatedCart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      setSubtotal(newSubtotal);

      const newDiscount = newSubtotal > 15000 ? 1000 : 0;
      setDiscount(newDiscount);

      setTotal(newSubtotal + shipping - newDiscount);

      // Here you would typically call an API to update the cart in the database
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get selected address details
      const selectedAddress = addresses.find(
        (addr) => addr._id === selectedAddressId
      );

      if (!selectedAddress) {
        throw new Error("Please select a shipping address");
      }

      // Prepare shipping address object
      const shippingAddress = {
        addressType: selectedAddress.addressType,
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2 || "",
        landmark: selectedAddress.landmark || "",
        city: selectedAddress.city,
        district: selectedAddress.district || "",
        state: selectedAddress.state,
        pincode: selectedAddress.pincode,
        country: selectedAddress.country || "India",
      };

      // Send order details to API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shippingAddress,
            // Cart items will be fetched from user's session on the backend
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to place order");
      }

      // Parse the JSON response to get the actual data
      const data = await response.json();
      console.log("Order response data:", data);

      // If there's a payment link, redirect to it
      if (data.paymentLink) {
        window.location.href = data.paymentLink;
        return; // Exit the function early to prevent setting orderComplete
      }

      // Only reach here if no payment link (e.g., for free orders)
      setOrderComplete(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert(error.message || "There was a problem placing your order");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const successVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  // Display order confirmation screen
  if (orderComplete) {
    return (
      <div className="container mx-auto py-16 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-md"
        >
          <motion.div
            className="flex justify-center mb-8"
            variants={successVariants}
          >
            <div className="rounded-full p-4 bg-primary/10 text-primary">
              <Check size={48} />
            </div>
          </motion.div>
          <motion.h1
            className="text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            className="text-muted-foreground mb-8"
            variants={itemVariants}
          >
            Thank you for your purchase. Your order #EZ
            {Math.floor(10000 + Math.random() * 90000)} has been successfully
            placed.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button className="mr-4">View Order</Button>
            <Button variant="outline">Continue Shopping</Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase securely</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping and Payment (Left Side) */}
        <motion.div
          className="lg:col-span-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <form onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck size={20} />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>
                    Select your delivery address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {addresses.length > 0 ? (
                    <div className="space-y-4">
                      <RadioGroup
                        value={selectedAddressId}
                        onValueChange={setSelectedAddressId}
                      >
                        {addresses.map((address) => (
                          <div
                            key={address._id}
                            className={`flex items-start space-x-2 rounded-md border p-4 ${
                              selectedAddressId === address._id
                                ? "border-primary"
                                : ""
                            }`}
                          >
                            <RadioGroupItem
                              value={address._id}
                              id={`address-${address._id}`}
                              className="mt-1"
                            />
                            <label
                              htmlFor={`address-${address._id}`}
                              className="flex flex-1 cursor-pointer flex-col"
                            >
                              <div className="flex items-center gap-2">
                                {address.addressType === "home" ? (
                                  <Home size={16} />
                                ) : address.addressType === "work" ? (
                                  <Building2 size={16} />
                                ) : (
                                  <MapPin size={16} />
                                )}
                                <span className="font-medium capitalize">
                                  {address.addressType} Address
                                </span>
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">
                                <p>{address.addressLine1}</p>
                                {address.addressLine2 && (
                                  <p>{address.addressLine2}</p>
                                )}
                                {address.landmark && (
                                  <p>Landmark: {address.landmark}</p>
                                )}
                                <p>
                                  {address.city}, {address.state},{" "}
                                  {address.pincode}
                                </p>
                              </div>
                            </label>
                          </div>
                        ))}
                      </RadioGroup>

                      <Button variant="outline" className="w-full mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Address
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No addresses found
                      </p>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Address
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard size={20} />
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    Payment will be processed securely via Razorpay
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-primary/10 p-4 text-sm">
                    <p className="font-medium">Secure Payment</p>
                    <p className="text-muted-foreground mt-1">
                      You'll be redirected to Razorpay to complete your payment
                      after placing the order
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:hidden">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    Review your items before placing the order
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">{item.quantity}x</div>
                        <div className="text-sm font-medium">{item.name}</div>
                      </div>
                      <div className="font-medium">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full py-6"
                disabled={loading || addresses.length === 0}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order • ₹${total.toFixed(2)}`
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Order Summary (Right Side) */}
        <motion.div
          className="hidden lg:block"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your
                  cart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cart.map((item) => (
                  <div key={item.product._id} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-16 w-24 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.product.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.product._id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.product._id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="font-medium">
                      ₹{item.product.price * item.quantity}
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <div className="rounded-md bg-primary/10 p-4 text-sm">
                  <p className="font-medium">Delivery Information</p>
                  <p className="text-muted-foreground mt-1">
                    Standard shipping: 3-5 business days
                  </p>
                  <p className="text-muted-foreground">
                    Free shipping on orders over ₹999
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
