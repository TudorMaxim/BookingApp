import { FunctionComponent, useState } from 'react';
import { IBookingState } from '../../context/types';
import calendarUtils from '../../utils/calendar';

interface CalendarBookingProps {
    booking: IBookingState,
}

const CalendarBooking: FunctionComponent<CalendarBookingProps> = ({ booking }) => {
  const { serviceName, duration } = booking;
  const bookingHeight = calendarUtils.getBookingHeight(65, duration);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div
        className="calendar-bookings-item"
        style={{ height: bookingHeight }}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <p>{serviceName}</p>
      </div>
      <div className="calendar-booking-item-details" hidden={!showDetails}> Details </div>
    </>
  );
};

export default CalendarBooking;
