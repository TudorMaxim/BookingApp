import {
  Dispatch, FunctionComponent, SetStateAction, useState,
} from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import StatefulButton from '../../common/components/StatefulButton';
import { useStore } from '../../context/store';
import { IBookingState, IServiceState } from '../../context/types';
import availabilityUtils from '../../utils/availability';

interface BookingFormAvailabilityProps {
    service: IServiceState,
    booking: IBookingState,
    setBooking: Dispatch<SetStateAction<IBookingState>>,
    previousPage: () => void;
}

const BookingFormAvailability: FunctionComponent<BookingFormAvailabilityProps> = ({
  service, booking, setBooking, previousPage,
}) => {
  const { state } = useStore();
  const { isLoading } = state.dashboard;
  const availabilityMatrix = service.availabilityMatrix as boolean[][];
  const { duration, bookingMatrix } = booking;
  const [selected, setSelected] = useState(false);
  const handleChange = (i: number, j: number): void => {
    setSelected(!bookingMatrix[i][j]);
    setBooking({
      ...booking,
      bookingMatrix: availabilityUtils.matrixSet(bookingMatrix, !bookingMatrix[i][j], i, j),
    });
  };

  const checkDisabled = (i: number, j: number): boolean => {
    if (!availabilityMatrix[i][j]) return true;
    if (selected && !bookingMatrix[i][j]) return true;
    return false;
  };

  return (
    <>
      <div className="booking-form-grid">
        <p className="add-service-form-title"> Booking Information </p>
        <p className="add-service-form-title right">
          {'Duration: '}
          <span className="duration-text">
            {duration}
            {' minutes'}
          </span>
        </p>
      </div>
      <div className="add-service-form-availability">
        <Table responsive borderless>
          <thead>
            <tr id="availability-hreader">
              <th>{' '}</th>
              {availabilityUtils.days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {availabilityUtils.hours.map((hour, i) => (
              <tr key={hour}>
                <td>{hour}</td>
                {availabilityUtils.days.map((day, j) => (
                  <td key={hour + day}>
                    <Form.Check
                      type="checkbox"
                      disabled={checkDisabled(i, j)}
                      checked={bookingMatrix[i][j]}
                      onChange={() => handleChange(i, j)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="booking-form-grid">
        <Button
          variant="secondary"
          className="booking-form-availability-button"
          onClick={() => previousPage()}
        >
          BACK
        </Button>
        <StatefulButton
          type="submit"
          text="SUBMIT"
          variant="primary"
          isLoading={isLoading}
          className="dashboard-page-button booking-form-availability-button"
        />
      </div>
    </>
  );
};

export default BookingFormAvailability;
