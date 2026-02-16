import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './index';
import { server } from '@/tests/mocks/server';
import { http, HttpResponse } from 'msw';

describe('Form', () => {
  describe('rendering', () => {
    it('should render form with all input fields', () => {
      render(<Form />);

      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Send message' })
      ).toBeInTheDocument();
    });

    it('should render with custom title', () => {
      render(<Form title="Contact Us" />);

      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText('Contact Us')).toHaveClass('form-title');
    });

    it('should not render title when not provided', () => {
      render(<Form />);

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should render title with ReactNode', () => {
      render(
        <Form
          title={
            <span>
              Contact <strong>Form</strong>
            </span>
          }
        />
      );

      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByText('Form')).toBeInTheDocument();
    });
  });

  describe('form interaction', () => {
    it('should update input values on change', async () => {
      const user = userEvent.setup();
      render(<Form />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message here');

      expect(nameInput).toHaveValue('John Doe');
      expect(emailInput).toHaveValue('john@example.com');
      expect(messageInput).toHaveValue('Test message here');
    });

    it('should handle successful form submission', async () => {
      const user = userEvent.setup();
      render(<Form />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');
      const submitButton = screen.getByRole('button', { name: 'Send message' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message with enough characters');

      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('The form has been successfully sent')
        ).toBeInTheDocument();
      });

      // Check if inputs are cleared
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });

    it('should display loading state during submission', async () => {
      const user = userEvent.setup();
      render(<Form />);

      // Delay the response
      server.use(
        http.post('/api/contact', async () => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return HttpResponse.json({ success: true });
        })
      );

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');
      const submitButton = screen.getByRole('button', { name: 'Send message' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message here');

      await user.click(submitButton);

      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Send message' })
        ).toBeInTheDocument();
      });
    });

    it('should handle form submission with server error', async () => {
      const user = userEvent.setup();

      render(<Form />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');
      const submitButton = screen.getByRole('button', { name: 'Send message' });

      // Use the default MSW handler which validates the input
      await user.type(nameInput, 'J');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message here');

      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Name must be at least 2 characters/i)
        ).toBeInTheDocument();
      });

      // Check if inputs are not cleared on error
      expect(nameInput).toHaveValue('J');
      expect(emailInput).toHaveValue('john@example.com');
      expect(messageInput).toHaveValue('Test message here');
    });

    it('should handle network errors', async () => {
      const user = userEvent.setup();

      server.use(
        http.post('/api/contact', () => {
          return HttpResponse.error();
        })
      );

      render(<Form />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');
      const submitButton = screen.getByRole('button', { name: 'Send message' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message here');

      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Network error/i)
        ).toBeInTheDocument();
      });
    });

    it('should prevent multiple submissions while submitting', async () => {
      const user = userEvent.setup();
      const mockFetch = vi.fn();

      server.use(
        http.post('/api/contact', async () => {
          mockFetch();
          await new Promise(resolve => setTimeout(resolve, 100));
          return HttpResponse.json({ success: true });
        })
      );

      render(<Form />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');
      const submitButton = screen.getByRole('button', { name: 'Send message' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message here');

      // Click multiple times rapidly
      await user.click(submitButton);
      await user.click(submitButton);
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('The form has been successfully sent')
        ).toBeInTheDocument();
      });

      // Should only be called once
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should clear error message on new submission', async () => {
      const user = userEvent.setup();

      render(<Form />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');
      const submitButton = screen.getByRole('button', { name: 'Send message' });

      // First submission with short name to trigger error
      await user.type(nameInput, 'J');
      await user.type(emailInput, 'john@example.com');
      await user.type(messageInput, 'Test message here');

      await user.click(submitButton);

      // Wait for error message to appear
      await waitFor(() => {
        expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
      });

      // Second submission with valid data
      await user.clear(nameInput);
      await user.type(nameInput, 'John Doe');
      await user.click(submitButton);

      // Error message should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/Name must be at least 2 characters/i)).not.toBeInTheDocument();
      });

      // Success message should appear
      await waitFor(() => {
        expect(screen.getByText(/successfully sent/i)).toBeInTheDocument();
      });
    });
  });

  describe('form structure', () => {
    it('should have correct form attributes', () => {
      render(<Form />);

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('method', 'POST');
      expect(form).toHaveClass('form');
      // acceptCharset in React gets normalized to accept-charset in HTML
      expect(form?.getAttribute('accept-charset')).toBe('UTF-8');
    });

    it('should render FormInput components with correct props', () => {
      render(<Form />);

      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const messageInput = screen.getByLabelText('Message');

      expect(nameInput).toHaveAttribute('name', 'name');
      expect(nameInput).toBeRequired();

      expect(emailInput).toHaveAttribute('name', 'email');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toBeRequired();

      expect(messageInput).toHaveAttribute('name', 'message');
      expect(messageInput).toHaveAttribute('minlength', '10');
    });
  });
});
