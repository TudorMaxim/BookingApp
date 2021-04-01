import { FunctionComponent } from 'react';
import { Button, Card } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import AppModal, { useAppModal } from '../../common/components/AppModal';
import ServiceForm from './ServiceForm';
import BookingForm from './BookingForm';
import { IServiceState } from '../../context/types';
import dashboardService from '../../service/dashboard.service';
import { useStore } from '../../context/store';
import '../styles/ServiceCard.sass';

export interface IServiceProps {
  service: IServiceState;
}

const ServiceCard: FunctionComponent<IServiceProps> = ({ service }) => {
  const { dispatch } = useStore();
  const [showServiceForm, toggleServiceForm] = useAppModal(false);
  const [showBookingForm, toggleBookingForm] = useAppModal(false);
  const {
    name, details, availability, places, duration, price, offeredBy,
  } = service;
  return (
    <>
      <AppModal
        show={showServiceForm}
        title="Edit a service"
        onHide={toggleServiceForm}
      >
        <ServiceForm
          isEdit
          initialService={service}
          toggleModal={toggleServiceForm}
        />
      </AppModal>
      <AppModal
        show={showBookingForm}
        title="Make a booking"
        onHide={toggleBookingForm}
      >
        <BookingForm
          service={service}
          toggleModal={toggleBookingForm}
        />
      </AppModal>
      <Card>
        <Card.Header>
          <Card.Title>
            {name}
            <Trash
              className="right"
              onClick={() => dashboardService.deleteService(service, dispatch)}
            />
            <PencilSquare
              className="right"
              onClick={toggleServiceForm}
            />
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {details}
          </Card.Text>
          <div className="card-details-grid">
            <p className="card-details-item">
              {availability}
              <span>Availability</span>
            </p>
            <p className="card-details-item">
              {places}
              {' available'}
              <span>Spaces</span>
            </p>
            <p className="card-details-item">
              {duration}
              {' minutes'}
              <span>Duration</span>
            </p>
            <p className="card-details-item">
              {price}
              {' RON'}
              <span>Price</span>
            </p>
          </div>
        </Card.Body>
        <Card.Footer>
          <Button className="dashboard-page-button" variant="primary" onClick={toggleBookingForm}>
            BOOK NOW
          </Button>
          <p className="card-footer-text">
            {'Offered by '}
            <span className="card-footer-company">{offeredBy}</span>
          </p>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ServiceCard;
