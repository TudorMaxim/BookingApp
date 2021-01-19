import { Dispatch } from 'react';
import {
  IAuthAction, IUserData, IAuthCredentials,
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
  logoutSuccess,
} from '../auth/actions';

const login = (credentials: IAuthCredentials, dispatch: Dispatch<IAuthAction>): void => {
  dispatch(loginRequest(credentials));
  if (credentials.email.length > 0 && credentials.password.length > 0) {
    const userData: IUserData = {
      email: credentials.email,
      token: 'Authenticated',
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch(loginSuccess(userData));
  } else {
    dispatch(loginFailure());
  }
};

const logout = (dispatch: Dispatch<IAuthAction>): void => {
  localStorage.removeItem('userData');
  dispatch(logoutSuccess());
};

const register = (
  credentials: IAuthCredentials,
  dispatch: Dispatch<IAuthAction>,
  callback: () => void,
): void => {
  dispatch(registerRequest(credentials));
  if (credentials.email.length > 0 && credentials.password.length > 0) {
    dispatch(registerSuccess());
    callback();
  } else {
    dispatch(registerFailure());
  }
};

const isLoggedIn = (): boolean => {
  const userDataJson = localStorage.getItem('userData');
  return userDataJson !== null;
};

const authService = {
  login,
  logout,
  register,
  isLoggedIn,
};

export default authService;
