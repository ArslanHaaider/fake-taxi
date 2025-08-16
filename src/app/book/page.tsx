'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookingForm } from '@/components/booking/booking-form';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { sendBookingConfirmationEmails } from '@/lib/email-service';

const bookingDetailsSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  specialRequests: z.string().optional(),
});

type BookingDetailsValues = z.infer<typeof bookingDetailsSchema>;

const paymentSchema = z.object({
  cardNumber: z.string().min(16, { message: 'Please enter a valid card number.' }),
  cardName: z.string().min(2, { message: 'Please enter the name on card.' }),
  expiryDate: z.string().min(5, { message: 'Please enter a valid expiry date (MM/YY).' }),
  cvv: z.string().min(3, { message: 'Please enter a valid CVV.' }),
});

type PaymentValues = z.infer<typeof paymentSchema>;

export default function BookingPage() {
  const searchParams = useSearchParams();
  const route = searchParams.get('route');
  
  const [bookingStep, setBookingStep] = useState<'fare-estimate' | 'passenger-details' | 'payment' | 'confirmation'>('fare-estimate');
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsValues | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  const detailsForm = useForm<BookingDetailsValues>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
    },
  });
  
  const paymentForm = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });
  
  function handleFareEstimated(fare: number) {
    setEstimatedFare(fare);
    setBookingStep('passenger-details');
  }
  
  function onDetailsSubmit(data: BookingDetailsValues) {
    setBookingDetails(data);
    setBookingStep('payment');
  }
  
  const [bookingId, setBookingId] = useState<string>("");

  function onPaymentSubmit(data: PaymentValues) {
    // In a real application, this would process the payment through a payment gateway
    console.log('Processing payment', data);
    
    // Generate a random booking ID
    const newBookingId = `RB-${Math.floor(Math.random() * 10000)}`;
    setBookingId(newBookingId);
    
    // Simulate payment processing
    setTimeout(async () => {
      // Get current date and time for the booking
      const now = new Date();
      const date = now.toLocaleDateString('en-GB');
      const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      
      // Get ride details from session storage or use placeholders
      const pickup = sessionStorage.getItem('pickup') || 'Frankfurt Main Station';
      const dropoff = sessionStorage.getItem('dropoff') || 'Frankfurt Airport';
      const passengers = Number(sessionStorage.getItem('passengers')) || 2;
      const vehicleType = sessionStorage.getItem('vehicleType') || 'Sedan';
      
      if (bookingDetails && estimatedFare) {
        // Send confirmation emails to customer and admin
        try {
          const emailResult = await sendBookingConfirmationEmails({
            id: newBookingId,
            firstName: bookingDetails.firstName,
            lastName: bookingDetails.lastName,
            email: bookingDetails.email,
            phone: bookingDetails.phone,
            pickup,
            dropoff,
            date,
            time,
            passengers,
            vehicleType,
            fare: estimatedFare,
            specialRequests: bookingDetails.specialRequests
          });
          
          if (emailResult.customerEmail) {
            toast({
              title: "Confirmation Email Sent",
              description: `A confirmation email has been sent to ${bookingDetails.email}`,
              variant: "default",
            });
          } else {
            toast({
              title: "Email Delivery Issue",
              description: "We couldn't send the confirmation email. Please contact support.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Error sending confirmation emails:', error);
          toast({
            title: "Email Service Error",
            description: "There was an error with our email service. Your booking is still confirmed.",
            variant: "destructive",
          });
        }
      }
      
      setBookingComplete(true);
      setBookingStep('confirmation');
    }, 1500);
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center font-poppins animate-slide-down">Book Your Ride</h1>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className={`flex items-center ${bookingStep === 'fare-estimate' ? 'text-blue-600 font-medium' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${bookingStep === 'fare-estimate' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
            <span>Fare Estimate</span>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-gray-200" />
          <div className={`flex items-center ${bookingStep === 'passenger-details' ? 'text-blue-600 font-medium' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${bookingStep === 'passenger-details' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
            <span>Passenger Details</span>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-gray-200" />
          <div className={`flex items-center ${bookingStep === 'payment' ? 'text-blue-600 font-medium' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${bookingStep === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
            <span>Payment</span>
          </div>
          <div className="h-0.5 flex-1 mx-4 bg-gray-200" />
          <div className={`flex items-center ${bookingStep === 'confirmation' ? 'text-blue-600 font-medium' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${bookingStep === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>4</div>
            <span>Confirmation</span>
          </div>
        </div>
      </div>
      
      {bookingStep === 'fare-estimate' && (
        <Card className="animate-fade-in">
          <CardHeader className="animate-slide-down">
            <CardTitle className="font-poppins">Estimate Your Fare</CardTitle>
            <CardDescription>
              Enter your ride details to get an estimated fare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookingForm onFareCalculated={handleFareEstimated} preselectedRoute={route} />
          </CardContent>
        </Card>
      )}
      
      {bookingStep === 'passenger-details' && estimatedFare !== null && (
        <Card className="animate-fade-in">
          <CardHeader className="animate-slide-down">
            <CardTitle className="font-poppins">Passenger Details</CardTitle>
            <CardDescription>
              Please provide your contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...detailsForm}>
              <form onSubmit={detailsForm.handleSubmit(onDetailsSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={detailsForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={detailsForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={detailsForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={detailsForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+49 123 456 7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={detailsForm.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Any special requirements for your ride" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">Estimated Fare:</p>
                  <p className="text-2xl font-bold text-blue-700">€{estimatedFare.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setBookingStep('fare-estimate')}>
                    Back
                  </Button>
                  <Button type="submit">Continue to Payment</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {bookingStep === 'payment' && estimatedFare !== null && bookingDetails !== null && (
        <Card className="animate-fade-in">
          <CardHeader className="animate-slide-down">
            <CardTitle className="font-poppins">Payment Information</CardTitle>
            <CardDescription>
              Please provide your payment details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                <FormField
                  control={paymentForm.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="4111 1111 1111 1111" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={paymentForm.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={paymentForm.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={paymentForm.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 mb-1">Total Amount:</p>
                  <p className="text-2xl font-bold text-blue-700">€{estimatedFare.toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setBookingStep('passenger-details')}>
                    Back
                  </Button>
                  <Button type="submit">Complete Booking</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {bookingStep === 'confirmation' && bookingComplete && (
        <Card className="animate-fade-in">
          <CardHeader className="animate-slide-down">
            <CardTitle className="text-center text-green-600 font-poppins">Booking Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>
            <p className="text-lg mb-4">
              Thank you, {bookingDetails?.firstName}! Your ride has been booked successfully.
            </p>
            <p className="text-gray-500 mb-6">
              A confirmation email has been sent to {bookingDetails?.email}.
              You will receive driver details shortly before your scheduled pickup.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Booking Summary</h3>
              <p className="text-gray-600 mb-1">Booking ID: {bookingId}</p>
              <p className="text-gray-600 mb-1">Passenger: {bookingDetails?.firstName} {bookingDetails?.lastName}</p>
              <p className="text-gray-600 mb-1">Total Amount: €{estimatedFare?.toFixed(2)}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <a href="/">Return to Home</a>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}