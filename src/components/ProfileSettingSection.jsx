"use client";
import React, { useState, useEffect } from "react";
import { TabsContent } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Edit,
  LogOut,
  Plus,
  Trash2,
  Home,
  Briefcase,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { addressApi } from "@/lib/addressApi";

const AddressIcon = ({ type }) => {
  switch (type) {
    case "home":
      return <Home className="h-4 w-4" />;
    case "work":
      return <Briefcase className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const ProfileSettingSection = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const addressesData = await addressApi.getAllAddresses();
      setAddresses(addressesData);
      setError(null);
    } catch (err) {
      setError("Failed to load addresses. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDeleteAddress = async (addressId) => {
    try {
      await addressApi.deleteAddress(addressId);
      fetchAddresses();
    } catch (err) {
      setError("Failed to delete address. Please try again.");
      console.error(err);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await addressApi.setDefaultAddress(addressId);
      fetchAddresses();
    } catch (err) {
      setError("Failed to set default address. Please try again.");
      console.error(err);
    }
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

  return (
    <>
      <motion.div variants={container} initial="hidden" animate="show">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Addresses</CardTitle>
              <CardDescription>
                Manage shipping and billing addresses
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => router.push("/add-address")}
            >
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading addresses...</div>
            ) : error ? (
              <div className="text-center py-4 text-destructive">{error}</div>
            ) : addresses.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No addresses found. Add your first address.
              </div>
            ) : (
              addresses.map((address) => (
                <motion.div
                  key={address._id}
                  variants={item}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-md gap-4"
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="bg-muted p-2 rounded-md">
                      <AddressIcon type={address.addressType} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium capitalize">
                          {address.addressType} Address
                        </h3>
                        {address.isDefault && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                        {address.landmark && `, ${address.landmark}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state}, {address.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    {!address.isDefault && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleSetDefault(address._id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        router.push(`/edit-address/${address._id}`)
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDeleteAddress(address._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible account actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileSettingSection;
