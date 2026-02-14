import { NextRequest, NextResponse } from 'next/server';

const EMAIL_JS_SERVICE_ID = process.env.EMAIL_JS_SERVICE_ID;
const EMAIL_JS_TEMPLATE_ID = process.env.EMAIL_JS_TEMPLATE_ID;
const EMAIL_JS_USER_ID = process.env.EMAIL_JS_USER_ID;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Input validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!EMAIL_JS_SERVICE_ID || !EMAIL_JS_TEMPLATE_ID || !EMAIL_JS_USER_ID) {
      console.error('EmailJS environment variables are not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Sanitize inputs (basic XSS prevention)
    const sanitize = (str: string) => str.replace(/[<>]/g, '');
    const sanitizedData = {
      name: sanitize(name.trim()),
      email: email.trim().toLowerCase(),
      message: sanitize(message.trim()),
    };

    // Send via EmailJS
    const formData = new FormData();
    formData.append('service_id', EMAIL_JS_SERVICE_ID);
    formData.append('template_id', EMAIL_JS_TEMPLATE_ID);
    formData.append('user_id', EMAIL_JS_USER_ID);
    formData.append('name', sanitizedData.name);
    formData.append('email', sanitizedData.email);
    formData.append('message', sanitizedData.message);

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EmailJS request failed:', response.status, errorText);
      throw new Error('EmailJS request failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
