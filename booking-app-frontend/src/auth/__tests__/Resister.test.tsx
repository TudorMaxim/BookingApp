import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../components/Register';

describe('Test Register page', () => {
  beforeEach(() => {
    render(<Register />);
  });

  test('Register button should be present', () => {
    expect(screen.getByText('REGISTER')).toBeTruthy();
  });

  test('Inputs shoud be present', () => {
    expect(screen.getByLabelText('Your name')).toBeTruthy();
    expect(screen.getByLabelText('Your email')).toBeTruthy();
    expect(screen.getByLabelText('Your password')).toBeTruthy();
  });
});
