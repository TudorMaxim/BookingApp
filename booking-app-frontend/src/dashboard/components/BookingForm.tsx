import { FormEvent, FunctionComponent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IBookingState, IServiceState } from '../../context/types';
import BookingFormInfo from './BookingFormInfo';
import BookingFormAvailability from './BookingFormAvailability';
import BookingFormSuccess from './BookingFormSuccess';
import { useStore } from '../../context/store';
import availabilityUtils from '../../utils/availability';
import bookingService from '../../service/booking.service';
import '../styles/BookingForm.sass';

interface BookingFormProps {
    service: IServiceState;
    toggleModal: () => void;
}

const BookingForm: FunctionComponent<BookingFormProps> = ({ service, toggleModal }) => {
  const { state, dispatch } = useStore();
  const [page, setPage] = useState(0);
  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);

  const [booking, setBooking] = useState<IBookingState>({
    serviceId: service.id as string,
    userId: state.profile.id as string,
    userName: state.profile.name as string,
    serviceName: service.name as string,
    email: state.profile.email as string,
    duration: service.duration as number,
    availability: service.availability as string,
    details: service.details as string,
    price: service.price as number,
    places: service.places as number,
    offeredBy: service.offeredBy as string,
    bookingMatrix: availabilityUtils.matrixInit(),
    phone: '',
  });

  const availabilitySelected = (): boolean => {
    const { bookingMatrix } = booking;
    for (let i = 0; i < bookingMatrix.length; i += 1) {
      for (let j = 0; j < bookingMatrix[i].length; j += 1) {
        if (bookingMatrix[i][j]) return true;
      }
    }
    return false;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (page === 0) {
      nextPage();
    } else if (page === 1 && availabilitySelected()) {
      bookingService.create(booking, dispatch)
        .then(() => nextPage())
        .then(() => bookingService.fetchByUser(state.profile.id as string, dispatch));
    }
  };

  const pages = [
    <BookingFormInfo
      booking={booking}
      setBooking={setBooking}
    />,
    <BookingFormAvailability
      service={service}
      booking={booking}
      setBooking={setBooking}
      previousPage={previousPage}
    />,
    <BookingFormSuccess toggleModal={toggleModal} />,
  ];

  return (
    <Form className="booking-form" onSubmit={handleSubmit}>
      { pages[page] }
    </Form>
  );
};

export default BookingForm;
