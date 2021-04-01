import React from 'react';
import { render, screen } from '@testing-library/react';
import * as dateFns from 'date-fns';
import Calendar from '../components/Calendar';

describe('Test Calendar page appearence', () => {
  beforeEach(() => {
    render(<Calendar />);
  });
});
