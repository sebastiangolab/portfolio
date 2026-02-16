interface ContactFormData {
   name: string;
   email: string;
   message: string;
}

export const getContactEmailHtml = (data: ContactFormData): string => {
   return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 25px;
      border-left: 4px solid #007bff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #1a1a1a;
    }
    .field {
      margin-bottom: 20px;
    }
    .label {
      font-weight: 600;
      color: #555;
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      background-color: #f8f9fa;
      padding: 12px 15px;
      border-radius: 4px;
      border-left: 3px solid #007bff;
      font-size: 15px;
    }
    .value a {
      color: #007bff;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .message {
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
      font-size: 13px;
      color: #6c757d;
      text-align: center;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
    </div>

    <div class="field">
      <span class="label">From</span>
      <div class="value">${data.name}</div>
    </div>

    <div class="field">
      <span class="label">Email</span>
      <div class="value">
        <a href="mailto:${data.email}">${data.email}</a>
      </div>
    </div>

    <div class="field">
      <span class="label">Message</span>
      <div class="value message">${data.message}</div>
    </div>

    <div class="footer">
      This email was sent from the contact form at <a href="http://sebastiangolab.pl">sebastiangolab.pl</a>
    </div>
  </div>
</body>
</html>
  `.trim();
};

export const getContactEmailText = (data: ContactFormData): string => {
   return `
New Contact Form Submission
===========================

From: ${data.name}
Email: ${data.email}

Message:
--------
${data.message}

---
This email was sent from the contact form at sebastiangolab.pl
  `.trim();
};
