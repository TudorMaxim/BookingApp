import { FunctionComponent, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import './Flash.sass';

interface IFlashProps {
    success: boolean;
    message: string;
}

const Flash: FunctionComponent<IFlashProps> = ({ success, message }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timeout);
  }, [show]);
  const variant = success ? 'success' : 'danger';
  if (show) {
    return (
      <Alert className="form-alert" dismissible variant={variant} onClose={() => setShow(false)}>
        {message}
      </Alert>
    );
  }
  return <></>;
};

export default Flash;
