import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookingForm } from "@/components/booking/booking-form";
import Aurora from "@/components/ui/aurora";
import BlurText from "@/components/ui/blur-text";
import SpotlightCard from "@/components/ui/spotlight-card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Aurora 
            colorStops={["#3B82F6", "#8B5CF6", "#EC4899"]}
            blend={0.4}
            amplitude={1.2}
            speed={0.3}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-purple-900/40 to-pink-900/60" />
        </div>
        <div className="container relative z-10 px-4 py-16 md:py-24 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <BlurText
                text="RIDE SMARTER SAVE TOGETHER."
                delay={100}
                animateBy="words"
                direction="top"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
              />
              <BlurText
                text="Book reliable rides in Frankfurt and across Germany with our streamlined booking service."
                delay={50}
                animateBy="words"
                direction="bottom"
                className="max-w-[600px] text-gray-200 md:text-xl"
              />
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-gray-100 font-bold px-8 py-3"
                >
                  Book Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 font-bold px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <SpotlightCard 
                className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20"
                spotlightColor="rgba(59, 130, 246, 0.2)"
              >
                <BookingForm />
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <BlurText
                text="How It Works"
                delay={0.2}
                animateBy="words"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              />
              <BlurText
                text="Book your ride in three simple steps"
                delay={0.4}
                animateBy="words"
                className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              />
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center animate-slide-up" style={{animationDelay: "0.3s"}}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Enter your locations</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us where you want to be picked up and where you're going.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center animate-slide-up" style={{animationDelay: "0.4s"}}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Choose your ride</h3>
              <p className="text-gray-600 leading-relaxed">
                Select the type of vehicle that best suits your needs.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center animate-slide-up" style={{animationDelay: "0.5s"}}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Confirm and pay</h3>
              <p className="text-gray-600 leading-relaxed">
                Confirm your booking details and make a secure payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose Us</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience the best ride booking service in Germany
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <SpotlightCard 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-6 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Safe and Secure</h3>
                <p className="text-gray-600 leading-relaxed">
                  All our drivers are verified and our payment system is secure with end-to-end encryption.
                </p>
              </CardContent>
            </SpotlightCard>
            
            <SpotlightCard 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              spotlightColor="rgba(139, 92, 246, 0.1)"
            >
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white mb-6 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Reliable Service</h3>
                <p className="text-gray-600 leading-relaxed">
                  On-time pickups and professional drivers for a smooth journey every time.
                </p>
              </CardContent>
            </SpotlightCard>
            
            <SpotlightCard 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              spotlightColor="rgba(236, 72, 153, 0.1)"
            >
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white mb-6 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Pricing</h3>
                <p className="text-gray-600 leading-relaxed">
                  No hidden fees. Get clear fare estimates before booking with transparent pricing.
                </p>
              </CardContent>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <BlurText
                text="Popular Routes"
                delay={0.2}
                animateBy="words"
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              />
              <BlurText
                text="Discover our most frequently booked destinations"
                delay={0.4}
                animateBy="words"
                className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              />
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <SpotlightCard 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="relative h-48">
                <Image 
                  src="/frankfurt-city.svg" 
                  alt="Frankfurt City" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Frankfurt City Center</h3>
                <p className="text-sm text-gray-600 mt-2">Explore the heart of Frankfurt with our city rides.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">From €15</span>
                  <Button variant="outline" size="sm" asChild className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    <Link href="/book?route=frankfurt-city">Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </SpotlightCard>
            
            <SpotlightCard 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              spotlightColor="rgba(139, 92, 246, 0.1)"
            >
              <div className="relative h-48">
                <Image 
                  src="/frankfurt-munich.svg" 
                  alt="Frankfurt to Munich" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Frankfurt to Munich</h3>
                <p className="text-sm text-gray-600 mt-2">Comfortable intercity travel to southern Germany.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">From €180</span>
                  <Button variant="outline" size="sm" asChild className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Link href="/book?route=frankfurt-munich">Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </SpotlightCard>
            
            <SpotlightCard 
              className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              spotlightColor="rgba(236, 72, 153, 0.1)"
            >
              <div className="relative h-48">
                <Image 
                  src="/frankfurt-berlin.svg" 
                  alt="Frankfurt to Berlin" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Frankfurt to Berlin</h3>
                <p className="text-sm text-gray-600 mt-2">Comfortable intercity travel between major German cities.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-700 bg-clip-text text-transparent">From €250</span>
                  <Button variant="outline" size="sm" asChild className="border-pink-200 text-pink-700 hover:bg-pink-50">
                    <Link href="/book?route=frankfurt-berlin">Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </SpotlightCard>
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/routes">View All Routes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-blue-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Book Your Ride?</h2>
              <p className="max-w-[700px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience the convenience of our streamlined booking process today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="default" className="bg-white text-blue-900 hover:bg-gray-100">
                Book Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
