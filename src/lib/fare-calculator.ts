// Default fare calculation formulas
export const defaultFareFormulas = {
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

// Distance estimates between common locations (in kilometers)
export const distanceEstimates = {
  city: {
    // Frankfurt city locations
    'Frankfurt Main Station': {
      'Frankfurt Airport': 12,
      'Frankfurt Westend': 4,
      'Frankfurt Ostend': 5,
      'Frankfurt Nordend': 3,
      'Frankfurt Bornheim': 4,
      'Frankfurt Sachsenhausen': 3,
      'Frankfurt Bockenheim': 5,
      'Frankfurt Höchst': 10,
      'Frankfurt Niederrad': 7,
    },
    'Frankfurt Airport': {
      'Frankfurt Main Station': 12,
      'Frankfurt Westend': 15,
      'Frankfurt Ostend': 16,
      'Frankfurt Nordend': 14,
      'Frankfurt Bornheim': 15,
      'Frankfurt Sachsenhausen': 10,
      'Frankfurt Bockenheim': 16,
      'Frankfurt Höchst': 18,
      'Frankfurt Niederrad': 6,
    },
    'Frankfurt Westend': {
      'Frankfurt Main Station': 4,
      'Frankfurt Airport': 15,
      'Frankfurt Ostend': 6,
      'Frankfurt Nordend': 3,
      'Frankfurt Bornheim': 5,
      'Frankfurt Sachsenhausen': 5,
      'Frankfurt Bockenheim': 3,
      'Frankfurt Höchst': 12,
      'Frankfurt Niederrad': 9,
    },
    'Frankfurt Ostend': {
      'Frankfurt Main Station': 5,
      'Frankfurt Airport': 16,
      'Frankfurt Westend': 6,
      'Frankfurt Nordend': 2,
      'Frankfurt Bornheim': 2,
      'Frankfurt Sachsenhausen': 6,
      'Frankfurt Bockenheim': 8,
      'Frankfurt Höchst': 14,
      'Frankfurt Niederrad': 10,
    },
    'Frankfurt Nordend': {
      'Frankfurt Main Station': 3,
      'Frankfurt Airport': 14,
      'Frankfurt Westend': 3,
      'Frankfurt Ostend': 2,
      'Frankfurt Bornheim': 2,
      'Frankfurt Sachsenhausen': 5,
      'Frankfurt Bockenheim': 5,
      'Frankfurt Höchst': 12,
      'Frankfurt Niederrad': 9,
    },
    'Frankfurt Bornheim': {
      'Frankfurt Main Station': 4,
      'Frankfurt Airport': 15,
      'Frankfurt Westend': 5,
      'Frankfurt Ostend': 2,
      'Frankfurt Nordend': 2,
      'Frankfurt Sachsenhausen': 6,
      'Frankfurt Bockenheim': 7,
      'Frankfurt Höchst': 13,
      'Frankfurt Niederrad': 10,
    },
    'Frankfurt Sachsenhausen': {
      'Frankfurt Main Station': 3,
      'Frankfurt Airport': 10,
      'Frankfurt Westend': 5,
      'Frankfurt Ostend': 6,
      'Frankfurt Nordend': 5,
      'Frankfurt Bornheim': 6,
      'Frankfurt Bockenheim': 7,
      'Frankfurt Höchst': 12,
      'Frankfurt Niederrad': 5,
    },
    'Frankfurt Bockenheim': {
      'Frankfurt Main Station': 5,
      'Frankfurt Airport': 16,
      'Frankfurt Westend': 3,
      'Frankfurt Ostend': 8,
      'Frankfurt Nordend': 5,
      'Frankfurt Bornheim': 7,
      'Frankfurt Sachsenhausen': 7,
      'Frankfurt Höchst': 9,
      'Frankfurt Niederrad': 11,
    },
    'Frankfurt Höchst': {
      'Frankfurt Main Station': 10,
      'Frankfurt Airport': 18,
      'Frankfurt Westend': 12,
      'Frankfurt Ostend': 14,
      'Frankfurt Nordend': 12,
      'Frankfurt Bornheim': 13,
      'Frankfurt Sachsenhausen': 12,
      'Frankfurt Bockenheim': 9,
      'Frankfurt Niederrad': 14,
    },
    'Frankfurt Niederrad': {
      'Frankfurt Main Station': 7,
      'Frankfurt Airport': 6,
      'Frankfurt Westend': 9,
      'Frankfurt Ostend': 10,
      'Frankfurt Nordend': 9,
      'Frankfurt Bornheim': 10,
      'Frankfurt Sachsenhausen': 5,
      'Frankfurt Bockenheim': 11,
      'Frankfurt Höchst': 14,
    },
  },
  intercity: {
    // Distances from Frankfurt to other German cities (in kilometers)
    'Frankfurt': {
      'Berlin': 545,
      'Munich': 390,
      'Hamburg': 490,
      'Cologne': 190,
      'Stuttgart': 205,
      'Düsseldorf': 220,
      'Leipzig': 385,
      'Dresden': 455,
      'Nuremberg': 225,
      'Hannover': 350,
    }
  }
};

// Vehicle types and their passenger capacities
export const vehicleTypes = {
  sedan: {
    name: 'Sedan',
    capacity: 4,
    image: '/sedan.svg'
  },
  suv: {
    name: 'SUV',
    capacity: 6,
    image: '/suv.svg'
  },
  luxury: {
    name: 'Luxury',
    capacity: 4,
    image: '/luxury.svg'
  }
};

// Function to get distance between two locations
export function getDistance(
  pickup: string,
  dropoff: string,
  rideType: 'city' | 'intercity'
): number {
  if (rideType === 'city') {
    // For city rides, check if we have a direct distance estimate
    if (
      distanceEstimates.city[pickup as keyof typeof distanceEstimates.city] &&
      distanceEstimates.city[pickup as keyof typeof distanceEstimates.city][dropoff as keyof typeof distanceEstimates.city[keyof typeof distanceEstimates.city]]
    ) {
      return distanceEstimates.city[pickup as keyof typeof distanceEstimates.city][dropoff as keyof typeof distanceEstimates.city[keyof typeof distanceEstimates.city]];
    }
    
    // If we have the reverse direction, use that
    if (
      distanceEstimates.city[dropoff as keyof typeof distanceEstimates.city] &&
      distanceEstimates.city[dropoff as keyof typeof distanceEstimates.city][pickup as keyof typeof distanceEstimates.city[keyof typeof distanceEstimates.city]]
    ) {
      return distanceEstimates.city[dropoff as keyof typeof distanceEstimates.city][pickup as keyof typeof distanceEstimates.city[keyof typeof distanceEstimates.city]];
    }
    
    // Default to an estimated distance if not found
    return 10; // Default 10km for unknown city routes
  } else {
    // For intercity rides
    if (
      distanceEstimates.intercity['Frankfurt'] &&
      distanceEstimates.intercity['Frankfurt'][dropoff as keyof typeof distanceEstimates.intercity.Frankfurt]
    ) {
      return distanceEstimates.intercity['Frankfurt'][dropoff as keyof typeof distanceEstimates.intercity.Frankfurt];
    }
    
    // Default to an estimated distance if not found
    return 300; // Default 300km for unknown intercity routes
  }
}

// Function to calculate fare based on distance, vehicle type, and ride type
export function calculateFare(
  distance: number,
  vehicleType: 'sedan' | 'suv' | 'luxury',
  rideType: 'city' | 'intercity',
  fareFormulas = defaultFareFormulas
): number {
  const formula = rideType === 'city' ? fareFormulas.cityRide : fareFormulas.intercityRide;
  
  // Calculate base fare
  const baseFare = formula.baseRate + (distance * formula.perKm);
  
  // Apply vehicle type multiplier
  const multiplier = formula[vehicleType];
  
  // Calculate total fare
  const totalFare = baseFare * multiplier;
  
  // Round to 2 decimal places
  return Math.round(totalFare * 100) / 100;
}

// Function to get available locations based on ride type
export function getAvailableLocations(rideType: 'city' | 'intercity'): {
  pickupLocations: string[];
  dropoffLocations: string[];
} {
  if (rideType === 'city') {
    // For city rides, get all Frankfurt locations
    const locations = Object.keys(distanceEstimates.city);
    return {
      pickupLocations: locations,
      dropoffLocations: locations
    };
  } else {
    // For intercity rides, pickup is always Frankfurt, dropoff is other cities
    return {
      pickupLocations: ['Frankfurt'],
      dropoffLocations: Object.keys(distanceEstimates.intercity.Frankfurt)
    };
  }
}

// Function to validate if a ride is possible
export function isValidRide(
  pickup: string,
  dropoff: string,
  passengers: number,
  vehicleType: 'sedan' | 'suv' | 'luxury',
  rideType: 'city' | 'intercity'
): { valid: boolean; message?: string } {
  // Check if vehicle can accommodate the number of passengers
  if (passengers > vehicleTypes[vehicleType].capacity) {
    return {
      valid: false,
      message: `${vehicleTypes[vehicleType].name} can only accommodate ${vehicleTypes[vehicleType].capacity} passengers.`
    };
  }
  
  // For city rides, check if both locations are in Frankfurt
  if (rideType === 'city') {
    const cityLocations = Object.keys(distanceEstimates.city);
    if (!cityLocations.includes(pickup) || !cityLocations.includes(dropoff)) {
      return {
        valid: false,
        message: 'Both pickup and dropoff locations must be within Frankfurt for city rides.'
      };
    }
  }
  
  // For intercity rides, check if pickup is Frankfurt and dropoff is another city
  if (rideType === 'intercity') {
    if (pickup !== 'Frankfurt') {
      return {
        valid: false,
        message: 'Pickup location must be Frankfurt for intercity rides.'
      };
    }
    
    const intercityDestinations = Object.keys(distanceEstimates.intercity.Frankfurt);
    if (!intercityDestinations.includes(dropoff)) {
      return {
        valid: false,
        message: 'Dropoff location must be a valid German city for intercity rides.'
      };
    }
  }
  
  // Check if pickup and dropoff are different
  if (pickup === dropoff) {
    return {
      valid: false,
      message: 'Pickup and dropoff locations must be different.'
    };
  }
  
  return { valid: true };
}