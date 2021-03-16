import { FunctionComponent, useState } from 'react';
import { Card } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import AppModal from '../../common/components/AppModal';
import ServiceForm from './ServiceForm';
import { IServiceState } from '../../context/types';
import '../styles/ServiceCard.sass';
import dashboardService from '../../service/dashboard.service';
import { useStore } from '../../context/store';
import StatefulButton from '../../common/components/StatefulButton';

export interface IServiceProps {
  service: IServiceState;
}

const ServiceCard: FunctionComponent<IServiceProps> = ({ service }) => {
  const { dispatch } = useStore();
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const {
    name, details, availability, places, duration, price, offeredBy,
  } = service;
  return (
    <>
      <AppModal show={show} title="Edit a service" onHide={toggleModal}>
        <ServiceForm isEdit initialService={service} toggleModal={toggleModal} />
      </AppModal>
      <Card>
        <Card.Header>
          <Card.Title>
            {name}
            <Trash className="right" onClick={() => dashboardService.deleteService(service, dispatch)} />
            <PencilSquare className="right" onClick={toggleModal} />
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
          <StatefulButton
            className="dashboard-page-button"
            isLoading={false}
            text="BOOK NOW"
            variant="primary"
          />
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
