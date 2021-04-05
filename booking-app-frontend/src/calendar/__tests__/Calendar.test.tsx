import React from 'react';
import { render, screen } from '@testing-library/react';
import * as dateFns from 'date-fns';
import Calendar from '../components/Calendar';

describe('Test Calendar page appearence', () => {
  beforeEach(() => {
    render(<Calendar />);
  });

  test('Time Line should be present', () => {
    expect(screen.getByTestId('time-line')).toBeTruthy();
  });

  test('Current time should be present', () => {
    expect(screen.getByTestId('current-time')).toBeTruthy();
  });

  test('Calendar renders all cells', () => {
    let container = screen.queryByTestId('calendar-week-view');
    expect(container).toBeTruthy();
    expect(container?.children.length).toBe(8 * 13);
  });
});
