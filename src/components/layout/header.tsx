"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="backdrop-blur-md bg-white/90 shadow-xl border-b border-white/30 animate-slide-down sticky top-0 z-50 transition-all duration-300 hover:shadow-2xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 animate-fade-in">
        <Link href="/" className="flex items-center gap-2 animate-slide-right group">
          <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300 relative">
            RideSmarter
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </span>
        </Link>
        <NavigationMenu className="animate-fade-in hidden lg:flex" style={{animationDelay: "0.2s"}}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/20 border-none text-sm font-medium transition-all duration-200 hover:text-blue-600">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/services/city"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">City Rides</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Book rides within Frankfurt city limits
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/services/intercity"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Intercity Travel</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Travel from Frankfurt to other German cities
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-4 animate-slide-left">
          <Button variant="ghost" className="font-montserrat bg-transparent hover:bg-blue-50 border border-transparent hover:border-blue-200 text-sm font-medium transition-all duration-200 hidden lg:inline-flex text-gray-700 hover:text-blue-600">Sign In</Button>
          <Button className="font-montserrat bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hidden lg:inline-flex hover:scale-105 transform">Book Now</Button>
          <Button className="font-montserrat bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl lg:hidden hover:scale-105 transform">Book Now</Button>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 bg-white/95 backdrop-blur-md animate-slide-down">
          <div className="container px-4 py-4 space-y-4">
            <nav className="space-y-2">
              <Link href="/services" className="block py-2 text-sm font-medium hover:text-blue-600 transition-colors">Services</Link>
              <Link href="/about" className="block py-2 text-sm font-medium hover:text-blue-600 transition-colors">About</Link>
              <Link href="/contact" className="block py-2 text-sm font-medium hover:text-blue-600 transition-colors">Contact</Link>
            </nav>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" className="font-montserrat flex-1">Sign In</Button>
              <Button className="font-montserrat flex-1">Book Now</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}