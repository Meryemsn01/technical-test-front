import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '@/app/login/page';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Login Page Integration', () => {

  beforeEach(() => {
    mockPush.mockClear();
  });

  test('should show an error message if form is submitted empty', () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    expect(screen.getByText('Veuillez remplir tous les champs.')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled(); 
  });

  test('should redirect to /products on successful login', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    expect(mockPush).toHaveBeenCalledWith('/products');
  });
});