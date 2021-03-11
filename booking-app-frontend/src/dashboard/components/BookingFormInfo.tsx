import { FunctionComponent, SetStateAction, Dispatch } from 'react';
import { Button } from 'react-bootstrap';
import FormInput from '../../common/components/FormInput';
import { IBookingState } from '../../context/types';

interface BookingFormInfoProps {
    booking: IBookingState;
    setBooking: Dispatch<SetStateAction<IBookingState>>;

}
const BookingFormInfo: FunctionComponent<BookingFormInfoProps> = ({
  booking, setBooking,
}) => (
  <>
    <p className="add-service-form-title"> Personal Details </p>
    <div className="booking-form-grid">
      <div className="booking-form-column">
        <FormInput
          label="Name"
          type="text"
          value={booking.name}
          pattern="^[a-zA-Z\s]*$"
          validationMessage="Your name must contain only letters!"
          onChange={(e) => setBooking({
            ...booking,
            name: e.target.value,
          })}
        />
        <FormInput
          label="Email"
          type="text"
          value={booking.email}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          validationMessage="Invalid email address"
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
          pattern="^\+4[0-9]{10}"
          value={booking.phoneNumber}
          onChange={(e) => setBooking({
            ...booking,
            phoneNumber: e.target.value,
          })}
        />
        <Button
          className="dashboard-page-button booking-form-button booking-form-element"
          type="submit"
        >
          NEXT
        </Button>
      </div>
    </div>
  </>
);

export default BookingFormInfo;
