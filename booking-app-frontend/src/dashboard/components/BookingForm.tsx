import { FormEvent, FunctionComponent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IBookingState, IServiceState } from '../../context/types';
import BookingFormInfo from './BookingFormInfo';
import BookingFormAvailability from './BookingFormAvailability';
import BookingFormSuccess from './BookingFormSuccess';
import { useStore } from '../../context/store';
import availabilityUtils from '../../utils/availability';
import '../styles/BookingForm.sass';
import dashboardService from '../../service/dashboard.service';

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
    name: state.profile.name as string,
    email: state.profile.email as string,
    duration: service.duration as number,
    bookingMatrix: availabilityUtils.matrixInit(),
    phoneNumber: '',
  });

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log(booking);
    dashboardService.submitBooking(booking, dispatch).then(() => nextPage());
  };

  const pages = [
    <BookingFormInfo
      booking={booking}
      setBooking={setBooking}
      nextPage={nextPage}
    />,
    <BookingFormAvailability
      service={service}
      booking={booking}
      setBooking={setBooking}
      previousPage={previousPage}
    />,
    <BookingFormSuccess
      booking={booking}
      toggleModal={toggleModal}
    />,
  ];

  return (
    <Form className="booking-form" onSubmit={handleSubmit}>
      { pages[page] }
    </Form>
  );
};

export default BookingForm;
