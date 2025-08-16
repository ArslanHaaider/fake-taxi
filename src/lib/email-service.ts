// This is a mock email service for demonstration purposes
// In a production environment, you would integrate with a real email service provider
// like SendGrid, Mailgun, AWS SES, etc.

interface EmailRecipient {
  email: string;
  name?: string;
}

interface EmailOptions {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  html: string;
  from?: EmailRecipient;
  cc?: EmailRecipient | EmailRecipient[];
  bcc?: EmailRecipient | EmailRecipient[];
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

// Admin email for receiving booking notifications
const ADMIN_EMAIL = 'admin@ridesmarter.de';

// Company information for email templates
const COMPANY_INFO = {
  name: 'RideSmarter',
  address: 'Mainzer Landstraße 123, 60329 Frankfurt am Main, Germany',
  phone: '+49 69 123456789',
  email: 'info@ridesmarter.de',
  website: 'www.ridesmarter.de',
  logo: 'https://ridesmarter.de/logo.png' // This would be a real logo URL in production
};

/**
 * Send an email using the configured email service
 * This is a mock implementation that logs the email content to the console
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // In a real implementation, this would call an email service API
    console.log('Sending email:', {
      to: options.to,
      from: options.from || { email: 'noreply@ridesmarter.de', name: 'RideSmarter' },
      subject: options.subject,
      html: options.html.substring(0, 100) + '...' // Truncate for logging
    });
    
    // Simulate a successful email send
    return {
      success: true,
      messageId: `mock-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error sending email'
    };
  }
}

/**
 * Generate HTML for a booking confirmation email to the customer
 */
export function generateCustomerConfirmationEmail(booking: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  fare: number;
  specialRequests?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { max-width: 150px; }
        h1 { color: #0066cc; }
        .booking-details { background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .booking-id { font-weight: bold; color: #0066cc; }
        .footer { font-size: 12px; color: #666; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px; }
        .button { display: inline-block; background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="${COMPANY_INFO.logo}" alt="${COMPANY_INFO.name} Logo" class="logo">
        <h1>Your Ride is Confirmed!</h1>
      </div>
      
      <p>Dear ${booking.firstName},</p>
      
      <p>Thank you for booking with ${COMPANY_INFO.name}. Your ride has been confirmed with the following details:</p>
      
      <div class="booking-details">
        <p><strong>Booking ID:</strong> <span class="booking-id">${booking.id}</span></p>
        <p><strong>Pickup:</strong> ${booking.pickup}</p>
        <p><strong>Dropoff:</strong> ${booking.dropoff}</p>
        <p><strong>Date & Time:</strong> ${booking.date} at ${booking.time}</p>
        <p><strong>Passengers:</strong> ${booking.passengers}</p>
        <p><strong>Vehicle Type:</strong> ${booking.vehicleType}</p>
        <p><strong>Fare:</strong> €${booking.fare.toFixed(2)}</p>
        ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
      </div>
      
      <p>You will receive driver details shortly before your scheduled pickup. The driver will contact you at ${booking.phone}.</p>
      
      <p>Need to make changes to your booking? Please contact our customer service at ${COMPANY_INFO.phone} or reply to this email.</p>
      
      <p>We look forward to providing you with a comfortable and safe journey.</p>
      
      <p>Best regards,<br>
      The ${COMPANY_INFO.name} Team</p>
      
      <div class="footer">
        <p>${COMPANY_INFO.name}<br>
        ${COMPANY_INFO.address}<br>
        ${COMPANY_INFO.phone}<br>
        ${COMPANY_INFO.email}<br>
        <a href="https://${COMPANY_INFO.website}">${COMPANY_INFO.website}</a></p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate HTML for a booking notification email to the admin
 */
export function generateAdminNotificationEmail(booking: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  fare: number;
  specialRequests?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking Notification</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { margin-bottom: 20px; }
        h1 { color: #0066cc; }
        .booking-details { background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .booking-id { font-weight: bold; color: #0066cc; }
        .customer-info { background-color: #e6f3ff; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
        .footer { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; }
        .button { display: inline-block; background-color: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Booking Received</h1>
      </div>
      
      <p>A new booking has been made through the RideSmarter platform. Details are as follows:</p>
      
      <div class="booking-details">
        <p><strong>Booking ID:</strong> <span class="booking-id">${booking.id}</span></p>
        <p><strong>Pickup:</strong> ${booking.pickup}</p>
        <p><strong>Dropoff:</strong> ${booking.dropoff}</p>
        <p><strong>Date & Time:</strong> ${booking.date} at ${booking.time}</p>
        <p><strong>Passengers:</strong> ${booking.passengers}</p>
        <p><strong>Vehicle Type:</strong> ${booking.vehicleType}</p>
        <p><strong>Fare:</strong> €${booking.fare.toFixed(2)}</p>
        ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
      </div>
      
      <div class="customer-info">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
      </div>
      
      <p><a href="https://${COMPANY_INFO.website}/admin" class="button">View in Admin Dashboard</a></p>
      
      <div class="footer">
        <p>This is an automated notification from the ${COMPANY_INFO.name} booking system.</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send booking confirmation emails to both customer and admin
 */
export async function sendBookingConfirmationEmails(booking: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: string;
  fare: number;
  specialRequests?: string;
}): Promise<{ customerEmail: boolean; adminEmail: boolean }> {
  // Send confirmation email to customer
  const customerEmailHtml = generateCustomerConfirmationEmail(booking);
  const customerEmailResult = await sendEmail({
    to: { email: booking.email, name: `${booking.firstName} ${booking.lastName}` },
    subject: `Booking Confirmation - ${COMPANY_INFO.name} - ${booking.id}`,
    html: customerEmailHtml
  });
  
  // Send notification email to admin
  const adminEmailHtml = generateAdminNotificationEmail(booking);
  const adminEmailResult = await sendEmail({
    to: { email: ADMIN_EMAIL, name: 'RideSmarter Admin' },
    subject: `New Booking: ${booking.id} - ${booking.firstName} ${booking.lastName}`,
    html: adminEmailHtml
  });
  
  return {
    customerEmail: customerEmailResult.success,
    adminEmail: adminEmailResult.success
  };
}