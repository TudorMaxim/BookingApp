import { FunctionComponent } from 'react';
import { useStore } from '../../context/store';
import authService from '../../service/auth.service';
import { IAuthCredentials } from '../actions/types';
import AuthForm, { AuthFormTypes } from './AuthForm';

const Recover: FunctionComponent = () => {
  const { dispatch } = useStore();

  const onSubmit = (credentials: IAuthCredentials) => {
    authService.recover(credentials.email, dispatch);
  };

  return (
    <div className="recover-password-page">
      <AuthForm type={AuthFormTypes.RECOVER} submitHandler={onSubmit} />
    </div>
  );
};

export default Recover;
