import { FunctionComponent, useState } from 'react';
import { Card } from 'react-bootstrap';
import { IBookingState } from '../../context/types';
import calendarUtils from '../../utils/calendar';

interface CalendarBookingProps {
    booking: IBookingState,
}

const CalendarBooking: FunctionComponent<CalendarBookingProps> = ({ booking }) => {
  const {
    serviceName, duration, details, availability, places, price, offeredBy,
  } = booking;
  const bookingHeight = calendarUtils.getBookingHeight(65, duration);
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div
        className="calendar-bookings-item"
        aria-hidden="true"
        style={{ height: bookingHeight }}
        onClick={() => setShowDetails(true)}
        onKeyDown={() => setShowDetails(true)}
      >
        <p>{serviceName}</p>
      </div>
      <div className="calendar-booking-item-details" hidden={!showDetails}>
        <Card>
          <Card.Header>
            <Card.Title>
              {serviceName}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setShowDetails(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {details}
            </Card.Text>
            <div className="card-details-grid">
              <p className="card-details-item">
                {availability}
                <span>Availability</span>
              </p>
              <p className="card-details-item">
                {places}
                {' available'}
                <span>Spaces</span>
              </p>
              <p className="card-details-item">
                {duration}
                {' minutes'}
                <span>Duration</span>
              </p>
              <p className="card-details-item">
                {price}
                {' RON'}
                <span>Price</span>
              </p>
            </div>
          </Card.Body>
          <Card.Footer>
            <p />
            <p className="card-footer-text">
              {'Offered by '}
              <span className="card-footer-company">{offeredBy}</span>
            </p>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default CalendarBooking;
