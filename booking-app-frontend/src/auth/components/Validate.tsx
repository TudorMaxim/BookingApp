import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';

interface IParams {
    uuid: string;
}

const Validate: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const { isLoading, isValidated, message } = state.auth;
  const { uuid } = useParams<IParams>();
  useEffect(() => {
    if (!isValidated) {
      authService.validate(uuid, dispatch);
    }
  }, [isValidated]);
  if (isLoading) {
    return (
      <p> Loading...</p>
    );
  }
  return (
    <p>
      {message}
    </p>
  );
};

export default Validate;
