import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../context/store';
import ServiceCard from './ServiceCard';
import ServiceForm from './ServiceForm';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import AppModal, { useAppModal } from '../../common/components/AppModal';
import NoServices from './NoServices';
import Flash from '../../common/components/Flash';
import '../styles/Dashboard.sass';

const Dashboard: FunctionComponent = () => {
  const { state } = useStore();
  const {
    services, isLoading, message, success,
  } = state.dashboard;
  const [show, toggle] = useAppModal(false);

  return (
    <>
      { !isLoading
        && (
        <div className="add-service-button-wrapper">
          <Button className="add-service-button dashboard-page-button" onClick={toggle}> Add Service </Button>
        </div>
        )}
      { message && !isLoading && success !== undefined
        && <Flash message={message} success={success} className="normal-alert" />}
      {isLoading && <LoadingSpinner />}
      <AppModal show={show} title="Add a new service" onHide={toggle}>
        <ServiceForm toggleModal={toggle} />
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
