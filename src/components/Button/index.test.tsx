import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
   describe('as Link', () => {
      it('should render as link with correct props', () => {
         render(<Button text="Click me" href="/test" title="Test button" />);

         const link = screen.getByRole('link', { name: 'Click me' });
         expect(link).toBeInTheDocument();
         expect(link).toHaveAttribute('href', '/test');
         expect(link).toHaveAttribute('title', 'Test button');
         expect(link).toHaveClass('button');
      });

      it('should render with empty href when href is not provided', () => {
         render(<Button text="Click me" title="Test button" />);

         const link = screen.getByText('Click me').closest('a');
         expect(link).toBeInTheDocument();
         expect(link).toHaveAttribute('href', '');
      });

      it('should render with target attribute', () => {
         render(
            <Button
               text="External link"
               href="https://example.com"
               title="External link"
               target="_blank"
            />,
         );

         const link = screen.getByRole('link', { name: 'External link' });
         expect(link).toHaveAttribute('target', '_blank');
      });

      it('should not render as button element when isFormButton is false', () => {
         render(
            <Button
               text="Link Button"
               href="/test"
               title="Link button"
               isFormButton={false}
            />,
         );

         expect(screen.queryByRole('button')).not.toBeInTheDocument();
         expect(screen.getByRole('link')).toBeInTheDocument();
      });
   });

   describe('as Form Button', () => {
      it('should render as submit button when isFormButton is true', () => {
         render(<Button text="Submit" title="Submit form" isFormButton />);

         const button = screen.getByRole('button', { name: 'Submit' });
         expect(button).toBeInTheDocument();
         expect(button).toHaveAttribute('type', 'submit');
         expect(button).toHaveAttribute('title', 'Submit form');
         expect(button).toHaveClass('button');
      });

      it('should render disabled button when disabled prop is true', () => {
         render(
            <Button
               text="Disabled"
               title="Disabled button"
               isFormButton
               disabled
            />,
         );

         const button = screen.getByRole('button', { name: 'Disabled' });
         expect(button).toBeDisabled();
      });

      it('should render enabled button when disabled prop is false', () => {
         render(
            <Button
               text="Enabled"
               title="Enabled button"
               isFormButton
               disabled={false}
            />,
         );

         const button = screen.getByRole('button', { name: 'Enabled' });
         expect(button).not.toBeDisabled();
      });

      it('should render enabled button when disabled prop is not provided', () => {
         render(<Button text="Default" title="Default button" isFormButton />);

         const button = screen.getByRole('button', { name: 'Default' });
         expect(button).not.toBeDisabled();
      });

      it('should not render as link when isFormButton is true', () => {
         render(
            <Button
               text="Form Button"
               href="/should-be-ignored"
               title="Form button"
               isFormButton
            />,
         );

         expect(screen.queryByRole('link')).not.toBeInTheDocument();
         expect(screen.getByRole('button')).toBeInTheDocument();
      });
   });
});
