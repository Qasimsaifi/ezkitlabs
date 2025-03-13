"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  User,
  LogOut,
  ShoppingCart,
  Settings,
  ChevronDown,
} from "lucide-react";
import LaunchUI from "@/components/logos/launch-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ isAuthenticated: initialAuthState = false }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);

  useEffect(() => {
    setIsAuthenticated(initialAuthState);
  }, [initialAuthState]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <header className="sticky bg-gradient-to-b from-slate-900 to-slate-800 top-0 z-50 border-b border-slate-700">
      <div className="backdrop-blur-lg">
        <div className="mx-auto max-w-container px-6">
          <NavbarComponent>
            <NavbarLeft>
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold"
              >
                <LaunchUI />
                <span>EZKITLABS</span>
              </Link>
            </NavbarLeft>

            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-base font-medium">
              <Link href="/products" className="transition-colors">
                Products
              </Link>
              <Link href="/about" className="transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="transition-colors">
                Contact Us
              </Link>
            </div>

            <NavbarRight>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateTo("/cart")}
                    className="hover:opacity-80"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative rounded-full flex items-center gap-2"
                      >
                        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/profile"
                          className="w-full flex items-center cursor-pointer"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/cart"
                          className="w-full flex items-center cursor-pointer"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Cart
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/settings"
                          className="w-full flex items-center cursor-pointer"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button variant="default" asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 md:hidden hover:opacity-80"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-xl font-bold"
                    >
                      <span>EZKITLABS</span>
                    </Link>
                    <Link href="/products" className="text-lg">
                      Products
                    </Link>
                    <Link href="/about" className="text-lg">
                      About Us
                    </Link>
                    <Link href="/contact" className="text-lg">
                      Contact Us
                    </Link>
                    {isAuthenticated ? (
                      <>
                        <Link
                          href="/profile"
                          className="text-lg text-left flex items-center"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          href="/cart"
                          className="text-lg text-left flex items-center"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Cart
                        </Link>
                        <Link
                          href="/settings"
                          className="text-lg text-left flex items-center"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="text-lg text-left flex items-center"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <Link href="/login" className="text-lg">
                        Get Started
                      </Link>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </NavbarRight>
          </NavbarComponent>
        </div>
      </div>
    </header>
  );
}
