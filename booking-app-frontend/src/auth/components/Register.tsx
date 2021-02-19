import { FunctionComponent, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useStore } from '../../context/store';
import AuthForm, { AuthFormTypes } from './AuthForm';
import { IAuthCredentials } from '../actions/types';
import authService from '../../service/auth.service';

const Register: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const history = useHistory();
  useEffect(() => {
    if (state.auth.isRegistered) {
      const timeout = setTimeout(() => history.push('/login'), 5000);
      return () => clearTimeout(timeout);
    }
    return () => null;
  }, [state.auth.isRegistered]);

  const handleSubmit = (credentials: IAuthCredentials) => {
    authService.register(credentials, dispatch);
  };

  if (state.auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <AuthForm type={AuthFormTypes.REGISTER} submitHandler={handleSubmit} />;
};

export default Register;
