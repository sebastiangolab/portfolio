import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { createMockRequest } from '@/tests/utils';
import { sendContactEmail } from '@/lib/email';

// Mock the email utility
vi.mock('@/lib/email', () => ({
   sendContactEmail: vi.fn(),
}));

describe('POST /api/contact', () => {

   const validFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message with enough characters.',
   };

   it('should successfully send email with valid data', async () => {
      (sendContactEmail as any).mockResolvedValueOnce(true);

      const request = createMockRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(sendContactEmail).toHaveBeenCalledTimes(1);
      expect(sendContactEmail).toHaveBeenCalledWith({
         name: 'John Doe',
         email: 'john@example.com',
         message: 'This is a test message with enough characters.',
      });
   });

   it('should sanitize input data', async () => {
      (sendContactEmail as any).mockResolvedValueOnce(true);

      const request = createMockRequest({
         name: '<script>alert("xss")</script>John',
         email: 'JOHN@EXAMPLE.COM',
         message: 'Message with <tags> should be sanitized',
      });

      await POST(request);

      expect(sendContactEmail).toHaveBeenCalledWith({
         name: 'scriptalert("xss")/scriptJohn',
         email: 'john@example.com',
         message: 'Message with tags should be sanitized',
      });
   });

   it('should return 400 for missing name', async () => {
      const request = createMockRequest({
         email: 'john@example.com',
         message: 'Test message here',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name must be at least 2 characters');
   });

   it('should return 400 for name too short', async () => {
      const request = createMockRequest({
         name: 'J',
         email: 'john@example.com',
         message: 'Test message here',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name must be at least 2 characters');
   });

   it('should return 400 for name with only whitespace', async () => {
      const request = createMockRequest({
         name: '  ',
         email: 'john@example.com',
         message: 'Test message here',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name must be at least 2 characters');
   });

   it('should return 400 for invalid name type', async () => {
      const request = createMockRequest({
         name: 123,
         email: 'john@example.com',
         message: 'Test message here',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Name must be at least 2 characters');
   });

   it('should return 400 for missing email', async () => {
      const request = createMockRequest({
         name: 'John Doe',
         message: 'Test message here',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid email address');
   });

   it('should return 400 for invalid email format', async () => {
      const invalidEmails = [
         'notanemail',
         'missing@domain',
         '@nodomain.com',
         'spaces in@email.com',
         'double@@domain.com',
      ];

      for (const email of invalidEmails) {
         const request = createMockRequest({
            name: 'John Doe',
            email,
            message: 'Test message here',
         });

         const response = await POST(request);
         const data = await response.json();

         expect(response.status).toBe(400);
         expect(data.error).toBe('Invalid email address');
      }
   });

   it('should return 400 for missing message', async () => {
      const request = createMockRequest({
         name: 'John Doe',
         email: 'john@example.com',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Message must be at least 10 characters');
   });

   it('should return 400 for message too short', async () => {
      const request = createMockRequest({
         name: 'John Doe',
         email: 'john@example.com',
         message: 'Short',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Message must be at least 10 characters');
   });

   it('should return 400 for message with only whitespace', async () => {
      const request = createMockRequest({
         name: 'John Doe',
         email: 'john@example.com',
         message: '          ',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Message must be at least 10 characters');
   });

   it('should return 400 for invalid message type', async () => {
      const request = createMockRequest({
         name: 'John Doe',
         email: 'john@example.com',
         message: 12345,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Message must be at least 10 characters');
   });

   it('should handle email sending errors', async () => {
      (sendContactEmail as any).mockRejectedValueOnce(new Error('SMTP error'));

      const request = createMockRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(
         'Failed to send message. Please try again later.',
      );
   });

   it('should handle configuration errors', async () => {
      (sendContactEmail as any).mockRejectedValueOnce(
         new Error('SMTP configuration is incomplete'),
      );

      const request = createMockRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(
         'Failed to send message. Please try again later.',
      );
   });

   it('should trim and sanitize inputs before sending', async () => {
      (sendContactEmail as any).mockResolvedValueOnce(true);

      const request = createMockRequest({
         name: '  <script>John Doe</script>  ',
         email: 'JOHN@EXAMPLE.COM',
         message: '  Test <tag>message</tag> with spaces  ',
      });

      await POST(request);

      expect(sendContactEmail).toHaveBeenCalledWith({
         name: 'scriptJohn Doe/script',
         email: 'john@example.com',
         message: 'Test tagmessage/tag with spaces',
      });
   });
});
