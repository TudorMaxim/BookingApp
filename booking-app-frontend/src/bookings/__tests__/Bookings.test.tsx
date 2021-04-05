import React from 'react';
import { render, screen } from '@testing-library/react';
import Bookings from '../components/Bookings';

describe('Test Bookings page appearence', () => {
  beforeEach(() => {
    render(<Bookings />);
  });

  test('No services message shoud be present', () => {
    const noServicesText = 'You do not have any services!';
    expect(screen.getByText(noServicesText)).toBeTruthy();
  });
});
