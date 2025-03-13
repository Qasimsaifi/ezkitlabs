"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  Package,
  Heart,
  Settings,
  Edit,
  Eye,
  Plus,
  Trash2,
  LogOut,
  Mail,
  Phone,
  ShoppingCart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getProfile } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProfileSettingSection from "./ProfileSettingSection";
import Link from "next/link";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile");
        router.push("/login"); // Redirect to login if user is not found
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  // Fetch wishlist when wishlist tab is active
  useEffect(() => {
    if (activeTab === "wishlist") {
      fetchWishlist();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orders`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const fetchWishlist = async () => {
    setIsLoadingWishlist(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/my-orderswishlist`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setWishlist(data.wishlist);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist");
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      </motion.div>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Wishlist</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Overview */}
        <TabsContent value="profile">
          <motion.div variants={container} initial="hidden" animate="show">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user ? (
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <motion.div variants={item} className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage
                          src={user.profilePicture}
                          alt={user.name}
                        />
                        <AvatarFallback className="text-2xl">
                          {user.name ? user.name.charAt(0) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full"
                        variant="secondary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </motion.div>

                    <motion.div
                      variants={item}
                      className="space-y-4 text-center md:text-left"
                    >
                      <h3 className="text-2xl font-semibold">{user.name}</h3>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phoneNumber || "No phone number"}</span>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/edit-profile">
                  <Button className="gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Order History */}
        <TabsContent value="orders">
          <motion.div variants={container} initial="hidden" animate="show">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View and track your EZKIT Labs purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingOrders ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="py-8 text-center">
                    <p className="text-red-500">{error}</p>
                    <Button onClick={fetchOrders} className="mt-4">
                      Try Again
                    </Button>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-8 text-center">
                    <p>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>
                              {new Date(order.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              ${order.total.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewOrderDetails(order)}
                                className="gap-1"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">
                                  Details
                                </span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Wishlist & Saved Items */}
        <TabsContent value="wishlist">
          <motion.div variants={container} initial="hidden" animate="show">
            <Card>
              <CardHeader>
                <CardTitle>Wishlist & Saved Items</CardTitle>
                <CardDescription>
                  View and manage your favorite EZKIT Labs products
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingWishlist ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="py-8 text-center">
                    <p className="text-red-500">{error}</p>
                    <Button onClick={fetchWishlist} className="mt-4">
                      Try Again
                    </Button>
                  </div>
                ) : wishlist === null ? (
                  <div className="py-8 text-center">
                    <p>Your wishlist is empty.</p>
                    <Button className="mt-4 gap-2">
                      <Plus className="h-4 w-4" />
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {wishlist.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={item}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <Card className="overflow-hidden h-full">
                          <div className="relative">
                            <img
                              src={product.image || "/api/placeholder/400/320"}
                              alt={product.name}
                              className="w-full object-cover aspect-video"
                            />
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium line-clamp-2 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-lg font-bold mb-3">
                              ${product.price.toFixed(2)}
                            </p>
                            <Button
                              variant="outline"
                              className="w-full gap-2"
                              size="sm"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="settings">
          <ProfileSettingSection />
        </TabsContent>
      </Tabs>

      {/* Delete Account Confirmation Dialog */}

      {/* Order Details Sheet */}
      <Sheet open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <SheetContent>
          {selectedOrder && (
            <>
              <SheetHeader>
                <SheetTitle>Order Details - {selectedOrder.id}</SheetTitle>
                <SheetDescription>
                  Ordered on {new Date(selectedOrder.date).toLocaleDateString()}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <p>Subtotal</p>
                    <p>${selectedOrder.total.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="font-medium mb-2">Shipping Status</p>
                  <div className="p-3 rounded-md bg-primary/10">
                    <p className="font-medium">{selectedOrder.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.status === "Delivered"
                        ? "Your order has been delivered"
                        : "Your order is on the way"}
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-4">Track Order</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserProfilePage;
