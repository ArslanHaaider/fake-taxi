'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock data for bookings
const mockBookings = [
  {
    id: 'RB-1234',
    passengerName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+49 123 456 7890',
    pickup: 'Frankfurt Main Station',
    dropoff: 'Frankfurt Airport',
    date: '2023-06-15',
    time: '14:30',
    passengers: 2,
    vehicleType: 'Sedan',
    fare: 35.50,
    status: 'Completed'
  },
  {
    id: 'RB-1235',
    passengerName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+49 987 654 3210',
    pickup: 'Frankfurt Airport',
    dropoff: 'Berlin',
    date: '2023-06-16',
    time: '09:00',
    passengers: 3,
    vehicleType: 'SUV',
    fare: 320.00,
    status: 'Confirmed'
  },
  {
    id: 'RB-1236',
    passengerName: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+49 555 123 4567',
    pickup: 'Frankfurt Westend',
    dropoff: 'Munich',
    date: '2023-06-17',
    time: '11:15',
    passengers: 1,
    vehicleType: 'Luxury',
    fare: 380.00,
    status: 'Pending'
  }
];

// Default fare calculation formulas
const defaultFareFormulas = {
  cityRide: {
    baseRate: 5,
    perKm: 1.8,
    sedan: 1,
    suv: 1.3,
    luxury: 1.8
  },
  intercityRide: {
    baseRate: 50,
    perKm: 0.8,
    sedan: 1,
    suv: 1.4,
    luxury: 2
  }
};

const fareFormulaSchema = z.object({
  cityBaseRate: z.coerce.number().min(0, { message: 'Base rate must be a positive number' }),
  cityPerKm: z.coerce.number().min(0, { message: 'Per km rate must be a positive number' }),
  citySedanMultiplier: z.coerce.number().min(0.1, { message: 'Multiplier must be at least 0.1' }),
  citySuvMultiplier: z.coerce.number().min(0.1, { message: 'Multiplier must be at least 0.1' }),
  cityLuxuryMultiplier: z.coerce.number().min(0.1, { message: 'Multiplier must be at least 0.1' }),
  intercityBaseRate: z.coerce.number().min(0, { message: 'Base rate must be a positive number' }),
  intercityPerKm: z.coerce.number().min(0, { message: 'Per km rate must be a positive number' }),
  intercitySedanMultiplier: z.coerce.number().min(0.1, { message: 'Multiplier must be at least 0.1' }),
  intercitySuvMultiplier: z.coerce.number().min(0.1, { message: 'Multiplier must be at least 0.1' }),
  intercityLuxuryMultiplier: z.coerce.number().min(0.1, { message: 'Multiplier must be at least 0.1' }),
});

type FareFormulaValues = z.infer<typeof fareFormulaSchema>;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [fareFormulas, setFareFormulas] = useState(defaultFareFormulas);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const fareForm = useForm<FareFormulaValues>({
    resolver: zodResolver(fareFormulaSchema),
    defaultValues: {
      cityBaseRate: defaultFareFormulas.cityRide.baseRate,
      cityPerKm: defaultFareFormulas.cityRide.perKm,
      citySedanMultiplier: defaultFareFormulas.cityRide.sedan,
      citySuvMultiplier: defaultFareFormulas.cityRide.suv,
      cityLuxuryMultiplier: defaultFareFormulas.cityRide.luxury,
      intercityBaseRate: defaultFareFormulas.intercityRide.baseRate,
      intercityPerKm: defaultFareFormulas.intercityRide.perKm,
      intercitySedanMultiplier: defaultFareFormulas.intercityRide.sedan,
      intercitySuvMultiplier: defaultFareFormulas.intercityRide.suv,
      intercityLuxuryMultiplier: defaultFareFormulas.intercityRide.luxury,
    },
  });
  
  function onFareFormulaSubmit(data: FareFormulaValues) {
    // Update fare formulas
    const updatedFormulas = {
      cityRide: {
        baseRate: data.cityBaseRate,
        perKm: data.cityPerKm,
        sedan: data.citySedanMultiplier,
        suv: data.citySuvMultiplier,
        luxury: data.cityLuxuryMultiplier
      },
      intercityRide: {
        baseRate: data.intercityBaseRate,
        perKm: data.intercityPerKm,
        sedan: data.intercitySedanMultiplier,
        suv: data.intercitySuvMultiplier,
        luxury: data.intercityLuxuryMultiplier
      }
    };
    
    setFareFormulas(updatedFormulas);
    setShowSuccessDialog(true);
    
    // In a real application, this would save to a database
    console.log('Updated fare formulas:', updatedFormulas);
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="fare-settings">Fare Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                View and manage all ride bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Passenger</th>
                      <th className="text-left py-3 px-4">Route</th>
                      <th className="text-left py-3 px-4">Date & Time</th>
                      <th className="text-left py-3 px-4">Vehicle</th>
                      <th className="text-left py-3 px-4">Fare</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{booking.id}</td>
                        <td className="py-3 px-4">
                          <div>{booking.passengerName}</div>
                          <div className="text-sm text-gray-500">{booking.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <span className="font-medium">From:</span> {booking.pickup}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">To:</span> {booking.dropoff}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{booking.date}</div>
                          <div className="text-sm text-gray-500">{booking.time}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>{booking.vehicleType}</div>
                          <div className="text-sm text-gray-500">{booking.passengers} passengers</div>
                        </td>
                        <td className="py-3 px-4 font-medium">€{booking.fare.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm" className="mr-2">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            Cancel
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="fare-settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fare Calculation Settings</CardTitle>
              <CardDescription>
                Modify the fare calculation formulas for different ride types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...fareForm}>
                <form onSubmit={fareForm.handleSubmit(onFareFormulaSubmit)} className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">City Ride Fare Formula</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={fareForm.control}
                        name="cityBaseRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Rate (€)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormDescription>
                              Starting fare for all city rides
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fareForm.control}
                        name="cityPerKm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Per Kilometer Rate (€)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormDescription>
                              Rate charged per kilometer for city rides
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <h4 className="text-md font-medium mt-6 mb-3">Vehicle Type Multipliers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={fareForm.control}
                        name="citySedanMultiplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sedan Multiplier</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fareForm.control}
                        name="citySuvMultiplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SUV Multiplier</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fareForm.control}
                        name="cityLuxuryMultiplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Luxury Multiplier</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Intercity Ride Fare Formula</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={fareForm.control}
                        name="intercityBaseRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Rate (€)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormDescription>
                              Starting fare for all intercity rides
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fareForm.control}
                        name="intercityPerKm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Per Kilometer Rate (€)</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormDescription>
                              Rate charged per kilometer for intercity rides
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <h4 className="text-md font-medium mt-6 mb-3">Vehicle Type Multipliers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={fareForm.control}
                        name="intercitySedanMultiplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sedan Multiplier</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fareForm.control}
                        name="intercitySuvMultiplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SUV Multiplier</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={fareForm.control}
                        name="intercityLuxuryMultiplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Luxury Multiplier</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <CardFooter className="px-0 pt-6">
                    <Button type="submit">Save Fare Settings</Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings Updated</DialogTitle>
            <DialogDescription>
              The fare calculation formulas have been successfully updated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}