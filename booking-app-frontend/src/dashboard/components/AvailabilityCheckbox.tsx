import {
  FunctionComponent, SetStateAction, Dispatch, useEffect, useRef, useState,
} from 'react';
import { Form } from 'react-bootstrap';
import availabilityUtils from '../../utils/availability';
import { IServiceState } from '../../context/types';

interface AvailabilityCheckboxProps {
    line: number;
    column: number;
    day: string;
    hour: string;
    service: IServiceState;
    setService: Dispatch<SetStateAction<IServiceState>>;
}

const AvailabilityCheckbox: FunctionComponent<AvailabilityCheckboxProps> = ({
  line, column, day, hour, service, setService,
}) => {
  const { availabilityMatrix } = service;
  const defaultChecked = availabilityMatrix ? availabilityMatrix[line][column] : false;
  const [checked, setChecked] = useState(defaultChecked);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const matrix = availabilityUtils.matrixCopy(availabilityMatrix);
      matrix[line][column] = checked;
      setService({
        ...service,
        availability: availabilityUtils.getAvailability(matrix),
        availabilityMatrix: matrix,
      });
    }
  }, [checked]);

  return (
    <Form.Check
      type="checkbox"
      id={`checkbox-${hour}-${day}`}
      data-line={line}
      data-column={column}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export default AvailabilityCheckbox;
