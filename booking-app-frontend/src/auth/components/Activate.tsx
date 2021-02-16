import { FunctionComponent, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';
import LoadingSpinner from '../../common/components/LoadingSpinner';

interface IParams {
    id: string;
}

const useActivate = (): boolean[] => {
  const { state, dispatch } = useStore();
  const { isLoading, isActivated, message } = state.auth;
  const { id } = useParams<IParams>();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!isActivated) {
      authService.activateAccount(id, dispatch);
    }
  }, [isActivated]);

  useEffect(() => {
    if (!isLoading && message) {
      const timeout = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(timeout);
    }
    return () => null;
  });

  return [showLoader, isActivated];
};

const Activate: FunctionComponent = () => {
  const [showLoader, isActivated] = useActivate();
  const redirectURL = isActivated ? '/login' : '/register';
  if (showLoader) {
    return <LoadingSpinner />;
  }
  return <Redirect to={redirectURL} />;
};

export default Activate;
