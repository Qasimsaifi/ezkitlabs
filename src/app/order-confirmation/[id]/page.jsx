"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Package, Truck, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <OrderSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/my-orders")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>My Orders</span>
        </Button>
        <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      </div>

      <div className="flex flex-col items-center mb-6 text-center">
        <div className="rounded-full p-3 mb-4 bg-green-100">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-lg mt-2">Thank you for your purchase</p>
        <p className="text-sm mt-1">Order #{order._id}</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <address className="not-italic">
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p>{order.shippingAddress.addressLine2}</p>
                )}
                {order.shippingAddress.landmark && (
                  <p>Landmark: {order.shippingAddress.landmark}</p>
                )}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.pincode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </address>
            </div>
            <div>
              <h3 className="font-medium mb-2">Order Status</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </div>
              <p className="text-sm">Payment Status: {order.paymentStatus}</p>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Estimated Delivery</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{getEstimatedDeliveryDate(order.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order Items ({order.items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-2">
                <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center">
                  {item.product.images && item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Package className="h-8 w-8" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price.toFixed(2)}</p>
                  <p className="text-sm">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>
                {order.deliveryCharge > 0
                  ? `₹${order.deliveryCharge.toFixed(2)}`
                  : "Free"}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2">
          <Button variant="outline" asChild>
            <Link href="/my-orders">View All Orders</Link>
          </Button>
          <div className="text-center text-sm">
            <p>
              Need help?{" "}
              <Link href="/contact" className="underline">
                Contact Support
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="flex flex-col items-center mb-6 text-center">
        <Skeleton className="h-20 w-20 rounded-full mb-4" />
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-6 w-48 mb-1" />
        <Skeleton className="h-4 w-32" />
      </div>

      <Skeleton className="h-64 w-full mb-6" />
      <Skeleton className="h-96 w-full mb-6" />
      <Skeleton className="h-56 w-full" />
    </div>
  );
}

function ErrorState({ error }) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6">{error}</p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => router.refresh()}>
          Try Again
        </Button>
        <Button onClick={() => router.push("/my-orders")}>View Orders</Button>
      </div>
    </div>
  );
}

function getStatusVariant(status) {
  switch (status.toLowerCase()) {
    case "processing":
      return "warning";
    case "shipped":
      return "info";
    case "delivered":
      return "success";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

function getEstimatedDeliveryDate(orderDate) {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 5); // Assuming 5 days delivery time

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
