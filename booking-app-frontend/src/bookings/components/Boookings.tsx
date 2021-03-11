import { FunctionComponent, useState } from 'react';
import {
  ButtonGroup, Dropdown, Table, Button,
} from 'react-bootstrap';
import { useStore } from '../../context/store';
import '../styles/Bookings.sass';

const Bookings: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const { services } = state.bookingsPage;
  const [current, setCurrent] = useState(0);
  if (services.length === 0) {
    return <p> You do not have any services!</p>;
  }

  const { name, bookings } = services[current];
  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Button className=" dropdown-button wide">{name}</Button>
        <Dropdown.Toggle split className="service-dropdown-toggle dropdown-button" />
        <Dropdown.Menu>
          {services.map((service, index) => (
            <div key={service.id}>
              <Dropdown.Item onSelect={() => setCurrent(index)}>
                {service.name}
              </Dropdown.Item>
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
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
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phoneNumber}</td>
              <td>{booking.availability}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Bookings;
