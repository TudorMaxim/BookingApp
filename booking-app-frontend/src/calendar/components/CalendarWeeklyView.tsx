import {
  FunctionComponent, MutableRefObject, useEffect, useRef, useState,
} from 'react';
import * as dateFns from 'date-fns';
import calendarUtils, { WeeklyCell, WeeklyCellTypes } from '../../utils/calendar';
import CalendarWeeklyCell from './CalendarWeeklyCell';
import { useStore } from '../../context/store';
import availabilityUtils from '../../utils/availability';
import CalendarBooking from './CalendarBooking';

interface CalendarWeeklyViewProps {
  currentDate: Date;
}

const useCalendarWeeklyView = (): [Date, number, MutableRefObject<HTMLDivElement | null>] => {
  const topLeftCellRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState(new Date());
  const [timeLineTop, setTimeLineTop] = useState(calendarUtils.mapTimeToPixels(time));
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (topLeftCellRef.current === null) return () => null;
    const { offsetTop, offsetHeight } = topLeftCellRef.current;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setTimeLineTop(calendarUtils.mapTimeToPixels(time, offsetTop, offsetHeight));
      setTime(new Date());
      return () => null;
    }
    const interval = setInterval(() => {
      setTimeLineTop(calendarUtils.mapTimeToPixels(time, offsetTop, offsetHeight));
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  return [time, timeLineTop, topLeftCellRef];
};

const CalendarWeeklyView: FunctionComponent<CalendarWeeklyViewProps> = ({ currentDate }) => {
  const { state } = useStore();
  const { bookings } = state.calendar;
  const bookingsMatrix = availabilityUtils.getBookingsMatrix(bookings);
  const cells = calendarUtils.getCalendarCells(currentDate);
  const [time, timeLineTop, topLeftCellRef] = useCalendarWeeklyView();

  const renderCell = ({
    type, value, day, hour,
  }: WeeklyCell) => {
    if (type === WeeklyCellTypes.CONTENT
      && bookingsMatrix && day && hour !== undefined && bookingsMatrix[hour][day - 1]) {
      const booking = calendarUtils.findBooking(bookings, day, hour);
      const currentWeek = cells
        .map((cell) => cell.current)
        .filter((current) => current === true)
        .length > 0;
      if (booking && currentWeek) return <CalendarBooking booking={booking} />;
    }
    return value;
  };

  return (
    <>
      <p
        className="current-time"
        hidden={!calendarUtils.isWorkInterval(time)}
        style={{ top: timeLineTop }}
      >
        {dateFns.format(time, 'HH:mm')}
      </p>
      <div
        className="time-line"
        hidden={!calendarUtils.isWorkInterval(time)}
        style={{ top: timeLineTop }}
      />
      <div className="calendar-week-view">
        {cells.map((cell, index) => (
          <CalendarWeeklyCell
            key={index}
            cell={cell}
            topLeftCellRef={topLeftCellRef}
          >
            {renderCell(cell)}
          </CalendarWeeklyCell>
        ))}
      </div>
    </>
  );
};

export default CalendarWeeklyView;
