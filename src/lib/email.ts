import nodemailer, { Transporter } from 'nodemailer';
import {
   getContactEmailHtml,
   getContactEmailText,
} from './emailTemplates/contactForm';

// Environment variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = process.env.EMAIL_TO;

interface ContactFormData {
   name: string;
   email: string;
   message: string;
}

/**
 * Creates a nodemailer transporter instance.
 * Uses cached transporter for connection pooling.
 */
let transporter: Transporter | null = null;

const getTransporter = (): Transporter => {
   if (transporter) {
      return transporter;
   }

   // Validate required environment variables
   if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      throw new Error(
         'SMTP configuration is incomplete. Check environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS',
      );
   }

   transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: SMTP_SECURE, // true for 465, false for other ports
      auth: {
         user: SMTP_USER,
         pass: SMTP_PASS,
      },
      // Connection pool settings
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000, // 1 second
      rateLimit: 5, // max 5 messages per rateDelta
   });

   return transporter;
};

/**
 * Sends a contact form email using Nodemailer.
 * @param data - The contact form data (name, email, message)
 * @returns Promise<boolean> - True if email sent successfully
 * @throws Error if SMTP configuration is invalid or sending fails
 */
export const sendContactEmail = async (
   data: ContactFormData,
): Promise<boolean> => {
   // Validate recipient email
   if (!EMAIL_FROM || !EMAIL_TO) {
      throw new Error(
         'Email addresses not configured. Check EMAIL_FROM and EMAIL_TO environment variables.',
      );
   }

   // Get transporter (this will throw if SMTP config is invalid)
   const transport = getTransporter();

   // Prepare email options
   const mailOptions = {
      from: {
         name: 'Portfolio Contact Form',
         address: EMAIL_FROM,
      },
      to: EMAIL_TO,
      replyTo: data.email, // Allow direct reply to sender
      subject: `New Contact Form Message from ${data.name}`,
      text: getContactEmailText(data),
      html: getContactEmailHtml(data),
      // Anti-spam headers
      headers: {
         'X-Mailer': 'Portfolio Contact Form',
         'X-Priority': '3', // Normal priority
      },
   };

   try {
      // Send email
      const info = await transport.sendMail(mailOptions);

      // Log success for debugging
      console.log('Email sent successfully:', {
         messageId: info.messageId,
         response: info.response,
         accepted: info.accepted,
         rejected: info.rejected,
      });

      return true;
   } catch (error) {
      // Log error details for debugging
      console.error('Failed to send email:', error);

      // Throw error to be handled by API route
      throw new Error('Failed to send email');
   }
};

/**
 * Verifies SMTP connection without sending an email.
 * Useful for health checks and initialization validation.
 */
export const verifyEmailConnection = async (): Promise<boolean> => {
   try {
      const transport = getTransporter();
      await transport.verify();
      console.log('SMTP connection verified successfully');
      return true;
   } catch (error) {
      console.error('SMTP connection verification failed:', error);
      return false;
   }
};
