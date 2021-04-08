import { FunctionComponent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useStore } from '../../context/store';
import ServiceCard from './ServiceCard';
import ServiceForm from './ServiceForm';
import SearchBar from './SearchBar';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import AppModal, { useAppModal } from '../../common/components/AppModal';
import NoServices from './NoServices';
import Flash from '../../common/components/Flash';
import '../styles/Dashboard.sass';
import { IServiceState } from '../../context/types';

const useDashboard = (search: string): [
  IServiceState[],
  boolean,
  string | undefined,
  boolean | undefined,
] => {
  const { state } = useStore();
  const {
    services, isLoading, message, success,
  } = state.dashboard;
  const filteredServices = services.filter((service) => {
    const { name } = service;
    if (!name) return false;
    if (search.length === 0) return true;
    return name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });
  return [filteredServices, isLoading, message, success];
};

const Dashboard: FunctionComponent = () => {
  const [show, toggle] = useAppModal(false);
  const [search, setSearch] = useState('');
  const [services, isLoading, message, success] = useDashboard(search);
  return (
    <>
      { !isLoading
        && (
        <div className="add-service-button-wrapper">
          <SearchBar search={search} setSearch={setSearch} />
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
