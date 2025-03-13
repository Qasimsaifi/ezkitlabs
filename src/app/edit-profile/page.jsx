"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, Camera, Save, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  profileApi,
  validateProfile,
  genderOptions,
  preferenceOptions,
  formatDateForInput,
} from "@/lib/profileUtils";
import { toast } from "react-toastify";
import { getProfile } from "@/lib/auth";

const EditProfilePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      confirmPassword: "",
      preferences: {
        emailNotifications: false,
        smsNotifications: false,
        pushNotifications: false,
        promotionalEmails: false,
        newsletter: false,
        theme: "system",
      },
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const userData = await getProfile();

        // Format preferences for form
        const preferences = {
          emailNotifications: false,
          smsNotifications: false,
          pushNotifications: false,
          promotionalEmails: false,
          newsletter: false,
          theme: "system",
          ...userData.preferences,
        };

        // Set form values
        form.reset({
          name: userData.name || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          dateOfBirth: formatDateForInput(userData.dateOfBirth) || "",
          gender: userData.gender || "",
          password: "",
          confirmPassword: "",
          preferences,
        });

        // Set profile picture if available
        if (userData.profilePicture) {
          setPreviewUrl(userData.profilePicture);
        }

        setIsLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch profile details");
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to fetch profile details. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };

    fetchUserProfile();
  }, [form]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Profile picture must be less than 5MB",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setProfilePicture(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDeleteAccount = async () => {
    try {
      setIsSubmitting(true);
      await profileApi.deleteAccount();

      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
        duration: 3000,
      });

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      toast({
        title: "Failed to delete account",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
      setShowDeleteDialog(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const { isValid, errors } = validateProfile(data);

      if (!isValid) {
        Object.entries(errors).forEach(([key, value]) => {
          form.setError(key, { message: value });
        });
        setIsSubmitting(false);
        return;
      }

      // Upload profile picture if changed
      let profilePictureUrl = previewUrl;
      if (profilePicture) {
        const uploadResult = await profileApi.uploadProfilePicture(
          profilePicture
        );
        profilePictureUrl = uploadResult.profilePicture;
      }

      // Prepare data for update
      const updateData = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        preferences: data.preferences,
        profilePicture: profilePictureUrl,
      };

      // Add password only if it was entered
      if (data.password) {
        updateData.password = data.password;
      }

      // Update profile
      await profileApi.updateProfile(updateData);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error) {
      toast({
        title: "Failed to update profile",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading profile details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <h2 className="text-lg font-semibold text-red-600">Error</h2>
        <p>{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push("/profile")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Profile
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            defaultValue="basic"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <Button
              type="submit"
              className="ml-10 bg-transparent shadow-none"
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <TabsContent value="basic">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={previewUrl} />
                        <AvatarFallback>
                          {form.getValues("name")?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      {/* <label
                        htmlFor="profile-picture"
                        className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer shadow-md hover:opacity-90 transition-opacity"
                      > */}
                      {/* <Camera className="h-4 w-4" /> */}
                      {/* <input
                          id="profile-picture"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfilePictureChange}
                        /> */}
                      {/* </label> */}
                    </div>
                    {/* <p className="text-xs text-muted-foreground mt-2">
                      Click the camera icon to change your profile picture
                    </p> */}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email"
                              {...field}
                              disabled={true}
                              className="bg-muted"
                            />
                          </FormControl>
                          <FormDescription>
                            Email cannot be changed
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10-digit phone number"
                              {...field}
                              disabled={isSubmitting}
                              maxLength={10}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Gender</FormLabel>
                        <Select
                          disabled={isSubmitting}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {genderOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("security")}
                      className="w-full"
                    >
                      Next: Security Settings
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="security">
                  {/* <Separator className="my-6" /> */}

                  <div className="mb-2">
                    <h3 className="text-lg font-medium text-destructive mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data
                    </p>

                    <Dialog
                      open={showDeleteDialog}
                      onOpenChange={setShowDeleteDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive" type="button">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove all your data from
                            our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              "Delete Account"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("basic")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("preferences")}
                      className="flex-1"
                    >
                      Next: Preferences
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="preferences">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Notification Preferences
                      </h3>
                      {preferenceOptions.notifications.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name={`preferences.${option.value}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{option.label}</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Marketing Preferences
                      </h3>
                      {preferenceOptions.marketing.map((option) => (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name={`preferences.${option.value}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{option.label}</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Theme Preference
                      </h3>
                      <FormField
                        control={form.control}
                        name="preferences.theme"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              disabled={isSubmitting}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {preferenceOptions.theme.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-6 flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab("security")}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EditProfilePage;
