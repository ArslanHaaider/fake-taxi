'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  calculateFare, 
  getDistance, 
  getAvailableLocations, 
  isValidRide,
  vehicleTypes,
  defaultFareFormulas
} from '@/lib/fare-calculator';

const bookingFormSchema = z.object({
  pickup: z.string().min(2, { message: 'Please select a pickup location.' }),
  dropoff: z.string().min(2, { message: 'Please select a dropoff location.' }),
  passengers: z.string().min(1, { message: 'Please select the number of passengers.' }),
  vehicleType: z.string().min(1, { message: 'Please select a vehicle type.' }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  onFareCalculated?: (fare: number) => void;
  preselectedRoute?: string | null;
}

export function BookingForm({ onFareCalculated, preselectedRoute }: BookingFormProps = {}) {
  const [rideType, setRideType] = useState<'city' | 'intercity'>('city');
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [locations, setLocations] = useState<{
    pickupLocations: string[];
    dropoffLocations: string[];
  }>({ pickupLocations: [], dropoffLocations: [] });

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      pickup: '',
      dropoff: '',
      passengers: '1',
      vehicleType: 'sedan',
    },
  });
  
  // Update available locations when ride type changes
  useEffect(() => {
    const availableLocations = getAvailableLocations(rideType);
    setLocations(availableLocations);
    
    // Reset form when ride type changes
    form.reset({
      pickup: '',
      dropoff: '',
      passengers: form.getValues('passengers'),
      vehicleType: form.getValues('vehicleType'),
    });
    
    setEstimatedFare(null);
    setDistance(null);
    setValidationError(null);
  }, [rideType, form]);
  
  // Handle preselected route if provided
  useEffect(() => {
    if (preselectedRoute) {
      // Parse the preselected route
      if (preselectedRoute === 'city') {
        setRideType('city');
        form.setValue('pickup', 'Frankfurt Main Station');
        form.setValue('dropoff', 'Frankfurt Airport');
      } else if (preselectedRoute === 'berlin') {
        setRideType('intercity');
        form.setValue('pickup', 'Frankfurt');
        form.setValue('dropoff', 'Berlin');
      } else if (preselectedRoute === 'munich') {
        setRideType('intercity');
        form.setValue('pickup', 'Frankfurt');
        form.setValue('dropoff', 'Munich');
      }
    }
  }, [preselectedRoute, form]);

  function onSubmit(data: BookingFormValues) {
    setValidationError(null);
    
    // Validate the ride
    const validation = isValidRide(
      data.pickup,
      data.dropoff,
      parseInt(data.passengers),
      data.vehicleType as 'sedan' | 'suv' | 'luxury',
      rideType
    );
    
    if (!validation.valid) {
      setValidationError(validation.message || 'Invalid ride parameters');
      return;
    }
    
    // Get distance between locations
    const routeDistance = getDistance(data.pickup, data.dropoff, rideType);
    setDistance(routeDistance);
    
    // Calculate fare
    const fare = calculateFare(
      routeDistance,
      data.vehicleType as 'sedan' | 'suv' | 'luxury',
      rideType
    );
    
    setEstimatedFare(fare);
    
    // Store booking details in sessionStorage for later use in email notifications
    try {
      sessionStorage.setItem('pickup', data.pickup);
      sessionStorage.setItem('dropoff', data.dropoff);
      sessionStorage.setItem('passengers', data.passengers);
      sessionStorage.setItem('vehicleType', data.vehicleType);
      sessionStorage.setItem('rideType', rideType);
      sessionStorage.setItem('estimatedFare', fare.toString());
      sessionStorage.setItem('distance', routeDistance.toString());
    } catch (error) {
      console.error('Error storing booking details in sessionStorage:', error);
    }
    
    if (onFareCalculated) {
      onFareCalculated(fare);
    }
    
    // In a real application, this would proceed to the next step of the booking process
    console.log('Booking form submitted', { ...data, estimatedFare: fare, distance: routeDistance });
  }

  return (
    <Card className="w-full max-w-4xl mx-auto animate-bounce-in">
      <CardContent className="p-6 animate-fade-in">
        <Tabs 
          defaultValue="city" 
          onValueChange={(value) => setRideType(value as 'city' | 'intercity')} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 animate-slide-down" style={{animationDelay: "0.1s"}}>
            <TabsTrigger value="cityRide">City Ride</TabsTrigger>
            <TabsTrigger value="intercityRide">Intercity Travel</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
              <TabsContent value="cityRide" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pickup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pickup location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Frankfurt Main Station">Frankfurt Main Station</SelectItem>
                            <SelectItem value="Frankfurt Airport">Frankfurt Airport</SelectItem>
                            <SelectItem value="Römerberg">Römerberg</SelectItem>
                            <SelectItem value="Palmengarten">Palmengarten</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dropoff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dropoff Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select dropoff location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Frankfurt Main Station">Frankfurt Main Station</SelectItem>
                            <SelectItem value="Frankfurt Airport">Frankfurt Airport</SelectItem>
                            <SelectItem value="Römerberg">Römerberg</SelectItem>
                            <SelectItem value="Palmengarten">Palmengarten</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="intercityRide" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pickup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure City</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select departure city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Frankfurt">Frankfurt</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dropoff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination City</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Berlin">Berlin</SelectItem>
                            <SelectItem value="Munich">Munich</SelectItem>
                            <SelectItem value="Hamburg">Hamburg</SelectItem>
                            <SelectItem value="Cologne">Cologne</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Passengers</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select passenger count" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4">4 Passengers</SelectItem>
                          <SelectItem value="5">5 Passengers</SelectItem>
                          <SelectItem value="6">6 Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedan">
                            <div className="flex items-center">
                              <img src="/sedan.svg" alt="Sedan" className="w-6 h-6 mr-2" />
                              <span>Sedan</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="suv">
                            <div className="flex items-center">
                              <img src="/suv.svg" alt="SUV" className="w-6 h-6 mr-2" />
                              <span>SUV</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="luxury">
                            <div className="flex items-center">
                              <img src="/luxury.svg" alt="Luxury" className="w-6 h-6 mr-2" />
                              <span>Luxury</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <Button type="submit" className="w-full md:w-auto">Calculate Fare</Button>
                
                {estimatedFare !== null && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg w-full">
                    <p className="text-sm text-blue-600 mb-1">Estimated Fare:</p>
                    <p className="text-3xl font-bold text-blue-700">€{estimatedFare.toFixed(2)}</p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Book Now</Button>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}