"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  CreditCard,
  Truck,
  Plus,
  Minus,
  Check,
  Wallet,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Smart Home Automation Starter Kit",
      price: 89.99,
      quantity: 1,
      image:
        "https://cdn.pixabay.com/photo/2015/12/07/01/38/arduino-1080213_1280.jpg",
    },
    {
      id: 2,
      name: "Arduino Weather Station DIY Kit",
      price: 49.99,
      quantity: 2,
      image:
        "https://cdn.pixabay.com/photo/2015/12/07/01/38/arduino-1080213_1280.jpg",
    },
    {
      id: 3,
      name: "Raspberry Pi Robot Essentials",
      price: 129.99,
      quantity: 1,
      image:
        "https://cdn.pixabay.com/photo/2015/12/07/01/38/arduino-1080213_1280.jpg",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 4.99;
  const discount = subtotal > 200 ? 15 : 0;
  const total = subtotal + shipping - discount;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
    }, 2000);
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
                    Enter your shipping details to receive your EZKIT products
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="fullName">
                        Full Name
                      </label>
                      <Input id="fullName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="phone">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="country">
                        Country
                      </label>
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="address">
                      Street Address
                    </label>
                    <Input id="address" placeholder="123 Main St" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="city">
                        City
                      </label>
                      <Input id="city" placeholder="San Francisco" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="state">
                        State / Province
                      </label>
                      <Input id="state" placeholder="California" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="zipCode">
                        ZIP / Postal Code
                      </label>
                      <Input id="zipCode" placeholder="94103" required />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="saveAddress" />
                    <label
                      htmlFor="saveAddress"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this address for future orders
                    </label>
                  </div>
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
                    Choose your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue="card"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="card" id="card" />
                      <label
                        htmlFor="card"
                        className="flex flex-1 cursor-pointer items-center justify-between"
                      >
                        <div className="font-medium">Credit / Debit Card</div>
                        <div className="flex gap-1">
                          <div className="h-6 w-10 rounded bg-primary/10"></div>
                          <div className="h-6 w-10 rounded bg-primary/10"></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="upi" id="upi" />
                      <label
                        htmlFor="upi"
                        className="flex flex-1 cursor-pointer items-center justify-between"
                      >
                        <div className="font-medium">UPI / Wallets</div>
                        <Wallet size={20} className="text-muted-foreground" />
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="cod" id="cod" />
                      <label
                        htmlFor="cod"
                        className="flex flex-1 cursor-pointer"
                      >
                        <div className="font-medium">Cash on Delivery</div>
                      </label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-6">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="cardNumber"
                        >
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            className="text-sm font-medium"
                            htmlFor="expiryDate"
                          >
                            Expiry Date
                          </label>
                          <Input id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="cvv">
                            CVV
                          </label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium"
                          htmlFor="nameOnCard"
                        >
                          Name on Card
                        </label>
                        <Input
                          id="nameOnCard"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="upiId">
                          UPI ID
                        </label>
                        <Input id="upiId" placeholder="username@upi" required />
                      </div>
                    </div>
                  )}
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
                    <div key={item.id} className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">{item.quantity}x</div>
                        <div className="text-sm font-medium">{item.name}</div>
                      </div>
                      <div className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full py-6" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order • $${total.toFixed(2)}`
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
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-24 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full"
                          onClick={() => updateQuantity(item.id, -1)}
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
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="rounded-md bg-primary/10 p-4 text-sm">
                  <p className="font-medium">Delivery Information</p>
                  <p className="text-muted-foreground mt-1">
                    Standard shipping: 3-5 business days
                  </p>
                  <p className="text-muted-foreground">
                    Free shipping on orders over $99
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Input placeholder="Enter promo code" className="flex-1" />
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
