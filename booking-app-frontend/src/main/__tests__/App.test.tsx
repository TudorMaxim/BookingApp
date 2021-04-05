import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Test Login and Resiter pages', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Links should be present', () => {
    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByText('Register')).toBeTruthy();
  });

  test('Login button should be present', () => {
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText('LOGIN')).toBeTruthy();
  });

  test('Register button should be present', () => {
    fireEvent.click(screen.getByText('Register'));
    expect(screen.getByText('REGISTER')).toBeTruthy();
  });
});
