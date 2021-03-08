import { FunctionComponent, SetStateAction, Dispatch } from 'react';
import { Button } from 'react-bootstrap';
import FormInput from '../../common/components/FormInput';
import { IBookingState } from '../../context/types';

interface BookingFormInfoProps {
    booking: IBookingState;
    setBooking: Dispatch<SetStateAction<IBookingState>>;
    nextPage: () => void;

}
const BookingFormInfo: FunctionComponent<BookingFormInfoProps> = ({
  booking, setBooking, nextPage,
}) => (
  <>
    <p className="add-service-form-title"> Personal Details </p>
    <div className="booking-form-grid">
      <div className="booking-form-column">
        <FormInput
          label="Name"
          type="text"
          value={booking.name}
          onChange={(e) => setBooking({
            ...booking,
            name: e.target.value,
          })}
        />
        <FormInput
          label="Email"
          type="text"
          value={booking.email}
          onChange={(e) => setBooking({
            ...booking,
            email: e.target.value,
          })}
        />
      </div>
      <div className="booking-form-column">
        <FormInput
          label="Phone Number"
          type="text"
          value={booking.phoneNumber}
          onChange={(e) => setBooking({
            ...booking,
            phoneNumber: e.target.value,
          })}
        />
        <Button
          className="dashboard-page-button booking-form-button booking-form-element"
          onClick={() => nextPage()}
        >
          NEXT
        </Button>
      </div>
    </div>
  </>
);

export default BookingFormInfo;
