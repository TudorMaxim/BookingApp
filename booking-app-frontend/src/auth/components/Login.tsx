import { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from '../../context/store';
import AuthForm, { AuthFormTypes } from './AuthForm';
import { IAuthCredentials } from '../actions/types';
import authService from '../../service/auth.service';

const Login: FunctionComponent = () => {
  const { state, dispatch } = useStore();

  const handleSubmit = (credentials: IAuthCredentials) => {
    authService.login(credentials, dispatch);
  };

  if (state.auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <AuthForm type={AuthFormTypes.LOGIN} submitHandler={handleSubmit} />;
};

export default Login;
