import { DragEventHandler, FunctionComponent, MutableRefObject } from 'react';
import { useStore } from '../../context/store';
import bookingService from '../../service/booking.service';
import { WeeklyCell, WeeklyCellTypes } from '../../utils/calendar';
import { updateBooking } from '../actions';

interface CalendarWeeklyCellProps {
    cell: WeeklyCell;
    topLeftCellRef: MutableRefObject<HTMLDivElement | null>;
}

const CalendarWeeklyCell: FunctionComponent<CalendarWeeklyCellProps> = ({
  cell, topLeftCellRef, children,
}) => {
  const { state, dispatch } = useStore();
  const { bookings } = state.calendar;
  const {
    type, current, day, hour,
  } = cell;
  let className = 'calendar-week-cell';
  if ([WeeklyCellTypes.DAYS, WeeklyCellTypes.HOURS].includes(type)) {
    className += ' calendar-week-cell-bold';
  }
  if (current) {
    className += ' calendar-week-current-day';
  }
  if (type === WeeklyCellTypes.TOP_LEFT) {
    return <div ref={topLeftCellRef} className={className}>{children}</div>;
  }
  if (day === 0 || hour === 12) {
    return <div className={className}>{children}</div>;
  }

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const serviceId = e.dataTransfer.getData('serviceId');
    const booking = bookings.find((b) => b.serviceId === serviceId);
    if (!booking || !day || !hour) return;
    if (!booking.availabilityMatrix || !booking.availabilityMatrix[hour][day - 1]) return;
    bookingService.update(booking, day, hour, dispatch);
  };

  return (
    <div
      className={className}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default CalendarWeeklyCell;
