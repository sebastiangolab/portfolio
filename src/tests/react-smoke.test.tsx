import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('React Testing Setup', () => {
   it('should render a simple component', () => {
      render(<div>Hello Test</div>);
      expect(screen.getByText('Hello Test')).toBeInTheDocument();
   });

   it('should have jest-dom matchers available', () => {
      render(<button disabled>Click me</button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toBeInTheDocument();
   });
});
