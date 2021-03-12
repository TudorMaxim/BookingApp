import { FunctionComponent, SetStateAction, Dispatch } from 'react';
import { Button, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import FormInput from '../../common/components/FormInput';
import { IBookingState } from '../../context/types';
import 'react-phone-input-2/lib/style.css';

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
        <Form.Group className="phone-group">
          <Form.Label> Phone Number </Form.Label>
          <PhoneInput
            country="ro"
            value={booking.phoneNumber}
            onChange={(phoneNumber) => setBooking({
              ...booking,
              phoneNumber: `+${phoneNumber}`,
            })}
          />
        </Form.Group>
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
