import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendContactEmail, verifyEmailConnection } from './email';
import nodemailer from 'nodemailer';

// Mock nodemailer
vi.mock('nodemailer');

describe('email utility', () => {
   const mockSendMail = vi.fn();
   const mockVerify = vi.fn();
   const mockTransporter = {
      sendMail: mockSendMail,
      verify: mockVerify,
   };

   beforeEach(() => {
      (nodemailer.createTransport as any).mockReturnValue(mockTransporter);
   });

   afterEach(() => {
      // Reset module state to clear cached transporter
      vi.resetModules();
   });

   describe('sendContactEmail', () => {
      const validFormData = {
         name: 'John Doe',
         email: 'john@example.com',
         message: 'This is a test message',
      };

      it('should send email successfully with valid data', async () => {
         mockSendMail.mockResolvedValueOnce({
            messageId: '<test@example.com>',
            response: '250 OK',
            accepted: ['admin@test.com'],
            rejected: [],
         });

         const result = await sendContactEmail(validFormData);

         expect(result).toBe(true);
         expect(mockSendMail).toHaveBeenCalledTimes(1);
         expect(mockSendMail).toHaveBeenCalledWith(
            expect.objectContaining({
               from: expect.objectContaining({
                  name: 'Portfolio Contact Form',
                  address: 'noreply@test.com',
               }),
               to: 'admin@test.com',
               replyTo: 'john@example.com',
               subject: 'New Contact Form Message from John Doe',
               text: expect.stringContaining('John Doe'),
               html: expect.stringContaining('John Doe'),
            }),
         );
      });

      it('should include proper email headers', async () => {
         mockSendMail.mockResolvedValueOnce({
            messageId: '<test@example.com>',
            response: '250 OK',
         });

         await sendContactEmail(validFormData);

         const callArgs = mockSendMail.mock.calls[0][0];
         expect(callArgs.headers).toEqual({
            'X-Mailer': 'Portfolio Contact Form',
            'X-Priority': '3',
         });
      });

      it('should set replyTo to sender email', async () => {
         mockSendMail.mockResolvedValueOnce({
            messageId: '<test@example.com>',
            response: '250 OK',
         });

         await sendContactEmail(validFormData);

         const callArgs = mockSendMail.mock.calls[0][0];
         expect(callArgs.replyTo).toBe('john@example.com');
      });

      it('should throw error when SMTP_HOST is missing', async () => {
         const originalHost = process.env.SMTP_HOST;
         delete process.env.SMTP_HOST;

         vi.resetModules();
         vi.doMock('nodemailer', () => ({
            default: {
               createTransport: vi.fn().mockReturnValue(mockTransporter),
            },
         }));

         const { sendContactEmail: sendEmailNew } = await import('./email');

         await expect(sendEmailNew(validFormData)).rejects.toThrow(
            'SMTP configuration is incomplete',
         );

         process.env.SMTP_HOST = originalHost;
      });

      it('should throw error when SMTP_PORT is missing', async () => {
         const originalPort = process.env.SMTP_PORT;
         delete process.env.SMTP_PORT;

         vi.resetModules();
         vi.doMock('nodemailer', () => ({
            default: {
               createTransport: vi.fn().mockReturnValue(mockTransporter),
            },
         }));

         const { sendContactEmail: sendEmailNew } = await import('./email');

         await expect(sendEmailNew(validFormData)).rejects.toThrow(
            'SMTP configuration is incomplete',
         );

         process.env.SMTP_PORT = originalPort;
      });

      it('should throw error when SMTP_USER is missing', async () => {
         const originalUser = process.env.SMTP_USER;
         delete process.env.SMTP_USER;

         vi.resetModules();
         vi.doMock('nodemailer', () => ({
            default: {
               createTransport: vi.fn().mockReturnValue(mockTransporter),
            },
         }));

         const { sendContactEmail: sendEmailNew } = await import('./email');

         await expect(sendEmailNew(validFormData)).rejects.toThrow(
            'SMTP configuration is incomplete',
         );

         process.env.SMTP_USER = originalUser;
      });

      it('should throw error when SMTP_PASS is missing', async () => {
         const originalPass = process.env.SMTP_PASS;
         delete process.env.SMTP_PASS;

         vi.resetModules();
         vi.doMock('nodemailer', () => ({
            default: {
               createTransport: vi.fn().mockReturnValue(mockTransporter),
            },
         }));

         const { sendContactEmail: sendEmailNew } = await import('./email');

         await expect(sendEmailNew(validFormData)).rejects.toThrow(
            'SMTP configuration is incomplete',
         );

         process.env.SMTP_PASS = originalPass;
      });

      it('should throw error when EMAIL_FROM is missing', async () => {
         const originalFrom = process.env.EMAIL_FROM;
         delete process.env.EMAIL_FROM;

         vi.resetModules();
         vi.doMock('nodemailer', () => ({
            default: {
               createTransport: vi.fn().mockReturnValue(mockTransporter),
            },
         }));

         const { sendContactEmail: sendEmailNew } = await import('./email');

         await expect(sendEmailNew(validFormData)).rejects.toThrow(
            'Email addresses not configured',
         );

         process.env.EMAIL_FROM = originalFrom;
      });

      it('should throw error when EMAIL_TO is missing', async () => {
         const originalTo = process.env.EMAIL_TO;
         delete process.env.EMAIL_TO;

         vi.resetModules();
         vi.doMock('nodemailer', () => ({
            default: {
               createTransport: vi.fn().mockReturnValue(mockTransporter),
            },
         }));

         const { sendContactEmail: sendEmailNew } = await import('./email');

         await expect(sendEmailNew(validFormData)).rejects.toThrow(
            'Email addresses not configured',
         );

         process.env.EMAIL_TO = originalTo;
      });

      it('should handle nodemailer sendMail errors', async () => {
         mockSendMail.mockRejectedValueOnce(
            new Error('SMTP connection failed'),
         );

         await expect(sendContactEmail(validFormData)).rejects.toThrow(
            'Failed to send email',
         );
      });

      it('should handle authentication errors', async () => {
         mockSendMail.mockRejectedValueOnce(new Error('Invalid login'));

         await expect(sendContactEmail(validFormData)).rejects.toThrow(
            'Failed to send email',
         );
      });

      it('should handle network errors', async () => {
         mockSendMail.mockRejectedValueOnce(new Error('Network timeout'));

         await expect(sendContactEmail(validFormData)).rejects.toThrow(
            'Failed to send email',
         );
      });

      it('should successfully send multiple emails', async () => {
         mockSendMail.mockResolvedValue({
            messageId: '<test@example.com>',
            response: '250 OK',
         });

         const result1 = await sendContactEmail(validFormData);
         const result2 = await sendContactEmail(validFormData);

         expect(result1).toBe(true);
         expect(result2).toBe(true);
         expect(mockSendMail).toHaveBeenCalledTimes(2);
      });

      it('should use secure connection when SMTP_SECURE is true', async () => {
         const originalSecure = process.env.SMTP_SECURE;
         const originalPort = process.env.SMTP_PORT;

         process.env.SMTP_SECURE = 'true';
         process.env.SMTP_PORT = '465';

         vi.resetModules();

         const mockCreateTransport = vi.fn().mockReturnValue(mockTransporter);
         vi.doMock('nodemailer', () => ({
            default: { createTransport: mockCreateTransport },
         }));

         mockSendMail.mockResolvedValueOnce({
            messageId: '<test@example.com>',
            response: '250 OK',
         });

         const { sendContactEmail: sendEmailNew } = await import('./email');
         await sendEmailNew(validFormData);

         expect(mockCreateTransport).toHaveBeenCalledWith(
            expect.objectContaining({
               port: 465,
               secure: true,
            }),
         );

         process.env.SMTP_SECURE = originalSecure;
         process.env.SMTP_PORT = originalPort;
      });
   });

   describe('verifyEmailConnection', () => {
      it('should return true when connection is verified', async () => {
         mockVerify.mockResolvedValueOnce(true);

         const result = await verifyEmailConnection();

         expect(result).toBe(true);
         expect(mockVerify).toHaveBeenCalledTimes(1);
      });

      it('should return false when verification fails', async () => {
         mockVerify.mockRejectedValueOnce(new Error('Connection failed'));

         const result = await verifyEmailConnection();

         expect(result).toBe(false);
      });

      it('should handle missing SMTP configuration', async () => {
         const originalHost = process.env.SMTP_HOST;
         delete process.env.SMTP_HOST;

         vi.resetModules();
         vi.doMock('nodemailer', () => ({
            default: {
               createTransport: vi.fn().mockReturnValue(mockTransporter),
            },
         }));

         const { verifyEmailConnection: verifyNew } = await import('./email');
         const result = await verifyNew();

         expect(result).toBe(false);

         process.env.SMTP_HOST = originalHost;
      });
   });
});
