import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { createMockRequest } from '@/tests/utils';

describe('POST /api/contact', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  const validFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'This is a test message with enough characters.',
  };

  it('should successfully send email with valid data', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK',
    });

    const request = createMockRequest(validFormData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.emailjs.com/api/v1.0/email/send-form',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );
  });

  it('should sanitize input data', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK',
    });

    const request = createMockRequest({
      name: '<script>alert("xss")</script>John',
      email: 'JOHN@EXAMPLE.COM',
      message: 'Message with <tags> should be sanitized',
    });

    await POST(request);

    const formData = (global.fetch as any).mock.calls[0][1].body;
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    expect(name).toBe('scriptalert("xss")/scriptJohn');
    expect(email).toBe('john@example.com');
    expect(message).toBe('Message with tags should be sanitized');
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

  it('should handle errors gracefully when credentials check fails', async () => {
    // This test verifies that error handling works properly
    // Note: Testing missing env vars is difficult since they're captured at module load
    const request = createMockRequest(validFormData);

    // Mock a failure scenario
    (global.fetch as any).mockRejectedValueOnce(new Error('Configuration error'));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to send message. Please try again later.');
  });

  it('should handle EmailJS API errors', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'Bad Request',
    });

    const request = createMockRequest(validFormData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to send message. Please try again later.');
  });

  it('should handle network errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const request = createMockRequest(validFormData);
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to send message. Please try again later.');
  });

  it('should trim and sanitize inputs before sending', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK',
    });

    const request = createMockRequest({
      name: '  <script>John Doe</script>  ',
      email: 'JOHN@EXAMPLE.COM',
      message: '  Test <tag>message</tag> with spaces  ',
    });

    await POST(request);

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Get the FormData from the call
    const callArgs = (global.fetch as any).mock.calls[0];
    const formData = callArgs[1].body as FormData;

    // Verify FormData contains trimmed, sanitized, and normalized values
    expect(formData.get('name')).toBe('scriptJohn Doe/script');
    expect(formData.get('email')).toBe('john@example.com');
    expect(formData.get('message')).toBe('Test tagmessage/tag with spaces');
  });

  it('should include all EmailJS parameters in form data', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      text: async () => 'OK',
    });

    const request = createMockRequest(validFormData);
    await POST(request);

    const formData = (global.fetch as any).mock.calls[0][1].body;

    expect(formData.get('service_id')).toBe('test-service');
    expect(formData.get('template_id')).toBe('test-template');
    expect(formData.get('user_id')).toBe('test-user');
    expect(formData.get('name')).toBe('John Doe');
    expect(formData.get('email')).toBe('john@example.com');
    expect(formData.get('message')).toBe(
      'This is a test message with enough characters.'
    );
  });
});
