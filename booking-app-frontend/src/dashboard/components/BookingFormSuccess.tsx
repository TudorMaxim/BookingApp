import { FunctionComponent, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IBookingState } from '../../context/types';
import BookingRequestSent from '../../assets/BookingRequestSent.png';

interface BookingSuccessProps {
  toggleModal: () => void;
}

const BookingFormSuccess: FunctionComponent<BookingSuccessProps> = ({ toggleModal }) => {
  useEffect(() => {
    const timeout = setTimeout(() => toggleModal(), 5000);
    return () => clearTimeout(timeout);
  });
  return (
    <div className="booking-form-success">
      <img src={BookingRequestSent} alt="Request Sent" />
      <h3> Your request was sent! </h3>
      <p>
        In a couple of seconds you will receive a confirmation email with all the
        details of your reservation.
        <br />
        Thank you for using our services!
      </p>
      <Button className="dashboard-page-button" onClick={() => toggleModal()}> CLOSE </Button>
    </div>
  );
};

export default BookingFormSuccess;
