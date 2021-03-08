import { FunctionComponent, useEffect } from 'react';
import { IBookingState } from '../../context/types';

interface BookingSuccessProps {
  booking: IBookingState;
  toggleModal: () => void;
}

const BookingFormSuccess: FunctionComponent<BookingSuccessProps> = ({ toggleModal }) => {
  useEffect(() => {
    const timeout = setTimeout(() => toggleModal(), 5000);
    return () => clearTimeout(timeout);
  });
  return (<p> Success </p>);
};

export default BookingFormSuccess;
