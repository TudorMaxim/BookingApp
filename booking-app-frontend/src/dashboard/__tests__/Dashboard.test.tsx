import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

describe('Test Dashboard page appearence', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  test('Add button should be present', () => {
    expect(screen.getByText('Add Service')).toBeTruthy();
  });

  test('No services message shoud be present', () => {
    const noServicesText = 'Unfortunatelly, no services are available at the moment.';
    expect(screen.getByText(noServicesText)).toBeTruthy();
  });
});
