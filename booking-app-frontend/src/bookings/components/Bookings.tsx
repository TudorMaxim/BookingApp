import { FunctionComponent, useState } from 'react';
import {
  ButtonGroup, Dropdown, Table, Button,
} from 'react-bootstrap';
import { useStore } from '../../context/store';
import Flash from '../../common/components/Flash';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import '../styles/Bookings.sass';
import bookingService from '../../service/booking.service';

const Bookings: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const { services } = state.dashboard;
  const [current, setCurrent] = useState(0);
  const {
    bookings, isLoading, message, success,
  } = state.bookingsPage;

  const handleSelect = (selected: number) => {
    if (services.length && selected !== current) {
      bookingService.fetchByService(services[selected].id as string, dispatch);
      setCurrent(selected);
    }
  };

  if (services.length === 0) {
    return <p> You do not have any services!</p>;
  }
  const { name } = services[current];
  return (
    <>
      {message && !isLoading && success !== undefined
        && <Flash message={message} success={success} className="normal-alert" />}
      {isLoading && <LoadingSpinner />}
      <Dropdown as={ButtonGroup}>
        <Button className=" dropdown-button wide">{name}</Button>
        <Dropdown.Toggle split className="service-dropdown-toggle dropdown-button" />
        <Dropdown.Menu>
          {services.map((service, index) => (
            <div key={service.id}>
              <Dropdown.Item onSelect={() => handleSelect(index)}>
                {service.name}
              </Dropdown.Item>
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {!bookings.length && <h3> You have no bookings for this service. </h3>}
      {bookings.length > 0
        && (
        <Table className="bookings-table" responsive borderless striped>
          <thead>
            <tr className="bookings-table-hreader">
              <th> Name </th>
              <th> Email </th>
              <th> Phone Number </th>
              <th> Availability </th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.map((booking) => (
              <tr key={booking.userId + booking.serviceId}>
                <td>{booking.userName}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.availability}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}
    </>
  );
};

export default Bookings;
