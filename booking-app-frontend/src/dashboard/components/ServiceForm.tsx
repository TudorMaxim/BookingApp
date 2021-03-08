import { FunctionComponent, FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import StatefulButton from '../../common/components/StatefulButton';
import AvailabilityBox from './AvailabilityBox';
import FormInput from '../../common/components/FormInput';
import dashboardService from '../../service/dashboard.service';
import { useStore } from '../../context/store';
import { IServiceState } from '../../context/types';
import '../styles/ServiceForm.sass';

interface ServiceFormProps {
  initialService?: IServiceState;
  isEdit?: boolean;
  toggleModal: () => void;
}

const ServiceForm: FunctionComponent<ServiceFormProps> = ({
  initialService, isEdit, toggleModal,
}) => {
  const { state, dispatch } = useStore();
  const { id, company } = state.profile;
  const { isLoading } = state.dashboard;
  const [service, setService] = useState<IServiceState>(initialService || { duration: 30 });
  const {
    name, details, duration, places, price,
  } = service;

  const handleAdd = () => {
    dashboardService.addService({
      ...service,
      userId: id,
      offeredBy: company,
    }, dispatch).then((success) => {
      if (success) {
        toggleModal();
      }
    });
  };

  const handleEdit = () => {
    dashboardService.updateService(service, dispatch).then((success) => {
      if (success) {
        toggleModal();
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      handleEdit();
    } else {
      handleAdd();
    }
  };

  return (
    <Form className="add-service-form" onSubmit={handleSubmit}>
      <span className="add-service-form-title"> Service Details </span>
      <div className="add-service-form-details">
        <div className="add-service-form-details-left">
          <FormInput
            type="text"
            label="Service Name"
            placeholder="Give the name of the service"
            value={name || ''}
            onChange={(e) => setService({ ...service, name: e.target.value })}
          />
          <FormInput
            as="textarea"
            rows={5}
            label="Description"
            placeholder="Describe your service"
            value={details || ''}
            onChange={(e) => setService({ ...service, details: e.target.value })}
          />
        </div>
        <div className="add-service-form-details-right">
          <FormInput
            as="select"
            options={['30 minutes', '60 minutes', '90 minutes', '120 minutes']}
            label="Duration"
            value={duration ? `${duration} minutes` : '30 minutes'}
            onChange={(e) => setService({ ...service, duration: parseInt(e.target.value, 10) })}
          />
          <FormInput
            type="number"
            label="Spaces"
            min="0"
            value={places?.toString() || ''}
            placeholder="Give the number of available places"
            onChange={(e) => setService({ ...service, places: parseInt(e.target.value, 10) })}
          />
          <FormInput
            type="number"
            label="Price in RON"
            min="0"
            placeholder="Give the price in RON"
            value={price?.toString() || ''}
            onChange={(e) => setService({ ...service, price: parseInt(e.target.value, 10) })}
          />
        </div>
      </div>
      <span className="add-service-form-title"> Availability </span>
      <AvailabilityBox service={service} setService={setService} />
      <StatefulButton
        type="submit"
        variant="primary"
        text="SAVE"
        isLoading={isLoading}
        className="add-service-form-submit dashboard-page-button"
      />
    </Form>
  );
};

export default ServiceForm;
