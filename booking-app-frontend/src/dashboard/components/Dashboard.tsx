import { FunctionComponent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../context/store';
import ServiceCard from './ServiceCard';
import ServiceForm from './ServiceForm';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import AppModal from '../../common/components/AppModal';
import '../styles/Dashboard.sass';
import NoServices from './NoServices';
import Flash from '../../common/components/Flash';

const Dashboard: FunctionComponent = () => {
  const { state } = useStore();
  const {
    services, isLoading, message, success,
  } = state.dashboard;
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  return (
    <>
      <div className="add-service-button-wrapper">
        <Button className="add-service-button dashboard-page-button" onClick={toggleModal}> Add Service </Button>
      </div>
      { message && !isLoading && success !== undefined
        && <Flash message={message} success={success} className="normal-alert" />}
      {isLoading && <LoadingSpinner />}
      <AppModal show={show} title="Add a new service" onHide={toggleModal}>
        <ServiceForm toggleModal={toggleModal} />
      </AppModal>
      <ul id="services-list">
        {services.map((service) => (
          <li key={service.name} className="services-list-item">
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
      {services.length === 0 && !isLoading && <NoServices /> }
    </>
  );
};

export default Dashboard;
