import { FunctionComponent } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useStore } from '../../context/store';
import AuthForm, { AuthFormTypes } from './AuthForm';
import { IAuthCredentials } from '../actions/types';
import authService from '../../service/auth.service';

const Register: FunctionComponent = () => {
  const { state, dispatch } = useStore();
  const history = useHistory();

  const handleSubmit = (credentials: IAuthCredentials) => {
    authService.register(credentials, dispatch, () => history.push('/login'));
  };

  if (state.auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <AuthForm type={AuthFormTypes.REGISTER} submitHandler={handleSubmit} />;
};

export default Register;
