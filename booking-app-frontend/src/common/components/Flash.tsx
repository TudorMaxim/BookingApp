import { FunctionComponent, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useStore } from '../../context/store';
import { setFlash } from '../actions';
import '../styles/Flash.sass';

interface IFlashProps {
    success: boolean;
    message: string;
    className?: string;
}

const useFlash = (initialValue: boolean) => {
  const [show, setShow] = useState(initialValue);
  const { dispatch } = useStore();

  const hide = (): void => {
    if (show) {
      dispatch(setFlash());
      setShow(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => hide(), 3500);
    return () => clearTimeout(timeout);
  }, [show]);

  return { show, hide };
};

const Flash: FunctionComponent<IFlashProps> = ({ success, message, className }) => {
  const { show, hide } = useFlash(true);
  const variant = success ? 'success' : 'danger';
  if (show) {
    return (
      <Alert className={className} dismissible variant={variant} onClose={() => hide()}>
        {message}
      </Alert>
    );
  }
  return <></>;
};

export default Flash;
