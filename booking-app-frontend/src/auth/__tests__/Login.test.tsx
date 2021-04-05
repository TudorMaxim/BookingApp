import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/Login';

describe('Test Login page appearence', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('Login button should be present', () => {
    expect(screen.getByText('LOGIN')).toBeTruthy();
  });

  test('Inputs shoud be present', () => {
    expect(screen.getByLabelText('Your email')).toBeTruthy();
    expect(screen.getByLabelText('Your password')).toBeTruthy();
  });
});
