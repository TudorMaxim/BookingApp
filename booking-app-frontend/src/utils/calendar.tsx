import { ReactNode } from 'react';
import * as dateFns from 'date-fns';
import { IBookingState } from '../context/types';
import availabilityUtils from './availability';

export enum WeeklyCellTypes {
  DAYS = 'DAYS',
  HOURS = 'HOURS',
  CONTENT = 'CONTENT',
  TOP_LEFT = 'TOP_LEFT',
}

export interface WeeklyCell {
  type: WeeklyCellTypes;
  value?: ReactNode;
  day?: number;
  hour?: number;
  current?: boolean;
  events?: IBookingState[];
}

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const hours = Array.from(Array(12).keys()).map((hour) => {
  let mapped = `${hour + 7}:00`;
  if (hour < 3) {
    mapped = `0${mapped}`;
  }
  return mapped;
});

const getWeekDay = (currentDate: Date, date: Date): WeeklyCell => {
  const index = date.getDay();
  let weekDay = `${weekDays[index]} `;
  if (date.getMonth() !== currentDate.getMonth()) {
    weekDay = `${weekDay}${date.getMonth() + 1}/`;
  }
  weekDay = `${weekDay}${date.getDate()}`;
  let current: boolean | undefined;
  if (dateFns.isSameDay(date, new Date(Date.now()))) {
    current = true;
  }
  return {
    type: WeeklyCellTypes.DAYS,
    value: weekDay,
    current,
  };
};

const getWeekDays = (currentDate: Date): WeeklyCell[] => {
  const arr: WeeklyCell[] = [];
  const dayIndex = currentDate.getDay();
  weekDays.forEach((_, index) => {
    let weekDate: Date = currentDate;
    if (index < dayIndex) {
      weekDate = dateFns.subDays(currentDate, dayIndex - index);
    } else if (index > dayIndex) {
      weekDate = dateFns.addDays(currentDate, index - dayIndex);
    }
    arr.push(getWeekDay(currentDate, weekDate));
  });
  return arr;
};

const getCalendarCells = (currentDate: Date): WeeklyCell[] => {
  const cells: WeeklyCell[] = [{
    type: WeeklyCellTypes.TOP_LEFT,
  },
  ...getWeekDays(currentDate),
  ];
  hours.forEach((hour, hourIndex) => {
    cells.push({
      type: WeeklyCellTypes.HOURS,
      value: hour,
    });
    weekDays.forEach((_, dayIndex) => cells.push({
      type: WeeklyCellTypes.CONTENT,
      day: dayIndex,
      hour: hourIndex,
    }));
  });
  return cells;
};

const isWorkInterval = (time: Date): boolean => {
  const dayStart = new Date();
  dayStart.setHours(7, 0, 0);
  const dayEnd = new Date();
  dayEnd.setHours(19, 0, 0);
  if (dateFns.isBefore(time, dayStart)) return false;
  if (dateFns.isAfter(time, dayEnd)) return false;
  return true;
};

const mapTimeToPixels = (time: Date, top?: number, height?: number): number => {
  if (!top || !height) return 0;
  const today = new Date();
  today.setHours(7, 0, 0);
  const elapsedMinutes = dateFns.differenceInMinutes(time, today);
  const pixelsPerMinute = (height / 60);
  return top + height + elapsedMinutes * pixelsPerMinute;
};

const random = (max: number) => Math.floor(Math.random() * Math.floor(max));

const generateRandomBooking = (): boolean[][] => {
  const randomDay = random(weekDays.length - 1);
  const randomHour = random(hours.length - 1);
  const matrix = availabilityUtils.matrixInit();
  matrix[randomHour][randomDay] = true;
  return matrix;
};

const calendarUtils = {
  generateRandomBooking,
  mapTimeToPixels,
  isWorkInterval,
  getCalendarCells,
};

export default calendarUtils;
