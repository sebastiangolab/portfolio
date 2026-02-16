import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
   try {
      const { name, email, message } = await request.json();

      // Input validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
         return NextResponse.json(
            { error: 'Name must be at least 2 characters' },
            { status: 400 },
         );
      }

      if (!email || !emailRegex.test(email)) {
         return NextResponse.json(
            { error: 'Invalid email address' },
            { status: 400 },
         );
      }

      if (
         !message ||
         typeof message !== 'string' ||
         message.trim().length < 10
      ) {
         return NextResponse.json(
            { error: 'Message must be at least 10 characters' },
            { status: 400 },
         );
      }

      // Sanitize inputs (basic XSS prevention)
      const sanitize = (str: string) => str.replace(/[<>]/g, '');
      const sanitizedData = {
         name: sanitize(name.trim()),
         email: email.trim().toLowerCase(),
         message: sanitize(message.trim()),
      };

      // Send email via Nodemailer
      await sendContactEmail(sanitizedData);

      return NextResponse.json({ success: true });
   } catch (error) {
      console.error('Contact form error:', error);
      return NextResponse.json(
         { error: 'Failed to send message. Please try again later.' },
         { status: 500 },
      );
   }
}
