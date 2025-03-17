"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    const error = searchParams.get("error");

    if (error) {
      setErrorMessage(error);
    }

    if (status) {
      setPaymentStatus(status);
    }
  }, [searchParams]);

  return (
    <div className="container max-w-md py-16">
      <Card className="border-destructive">
        <CardHeader className="flex flex-col items-center text-center pb-6">
          <div className="rounded-full p-3 mb-4 bg-red-100">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            {errorMessage
              ? `Error: ${errorMessage}`
              : paymentStatus
              ? `Payment status: ${paymentStatus}`
              : "Your payment could not be processed at this time."}
          </p>
          <p className="text-sm mb-4">
            No charges have been made to your payment method. You can try again
            or choose a different payment option.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" asChild>
            <Link href="/checkout">Try Again</Link>
          </Button>
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">
                <Home size={16} className="mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/cart">
                <ShoppingBag size={16} className="mr-2" />
                Cart
              </Link>
            </Button>
          </div>
          <div className="text-center mt-4 text-sm">
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
