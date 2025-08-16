import { NextResponse } from 'next/server';
import { sendBookingConfirmationEmails } from '@/lib/email-service';

// This is a test endpoint to verify email functionality
// In a production environment, this would be secured or removed
export async function GET() {
  try {
    // Create a test booking
    const testBooking = {
      id: `TEST-${Math.floor(Math.random() * 10000)}`,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com', // This would be replaced with a real email in production
      phone: '+49 123 456 7890',
      pickup: 'Frankfurt Main Station',
      dropoff: 'Frankfurt Airport',
      date: new Date().toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      passengers: 2,
      vehicleType: 'Sedan',
      fare: 35.50,
      specialRequests: 'This is a test booking to verify email functionality',
    };
    
    // Send test emails
    const result = await sendBookingConfirmationEmails(testBooking);
    
    return NextResponse.json({
      success: true,
      message: 'Test emails sent successfully',
      details: result
    });
  } catch (error) {
    console.error('Error sending test emails:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send test emails',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}