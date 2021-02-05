import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';

interface IParams {
    uuid: string;
}

const Activate: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const { isLoading, isActivated, message } = state.auth;
  const { uuid } = useParams<IParams>();
  useEffect(() => {
    if (!isActivated) {
      authService.activateAccount(uuid, dispatch);
    }
  }, [isActivated]);
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

export default Activate;
