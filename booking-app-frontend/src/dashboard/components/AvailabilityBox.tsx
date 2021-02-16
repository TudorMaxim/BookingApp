import { FunctionComponent, SetStateAction, Dispatch } from 'react';
import { Table } from 'react-bootstrap';
import AvailabilityCheckbox from './AvailabilityCheckbox';
import availabilityUtils from '../../utils/availability';
import { IServiceState } from '../../context/types';

interface AvailabilityBoxProps {
  service: IServiceState;
  setService: Dispatch<SetStateAction<IServiceState>>;
}

const AvailabilityBox: FunctionComponent<AvailabilityBoxProps> = ({ service, setService }) => (
  <div className="add-service-form-availability">
    <Table responsive borderless>
      <thead>
        <tr id="availability-hreader">
          <th>{' '}</th>
          {availabilityUtils.days.map((day) => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {availabilityUtils.hours.map((hour, i) => (
          <tr key={hour}>
            <td>{hour}</td>
            {availabilityUtils.days.map((day, j) => (
              <td key={hour + day}>
                <AvailabilityCheckbox
                  line={i}
                  column={j}
                  day={day}
                  hour={hour}
                  service={service}
                  setService={setService}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default AvailabilityBox;
