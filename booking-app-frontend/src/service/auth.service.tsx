import { Dispatch } from 'react';
import { IAuthAction, IAuthCredentials } from '../auth/actions/types';
import {
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
  logoutSuccess,
} from '../auth/actions';
import { IProfileState } from '../context/types';
import { loadProfile } from '../profile/actions';
import { IProfileAction } from '../profile/actions/types';

const login = async (
  credentials: IAuthCredentials,
  dispatch: Dispatch<IAuthAction | IProfileAction>,
): Promise<void> => {
  dispatch(loginRequest(credentials));
  if (credentials.email === '' || credentials.password === '') {
    dispatch(loginFailure('Email and password cannot be empty!'));
    return;
  }
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const body = await response.json();
  if (!response.ok) {
    dispatch(loginFailure(body.message));
    return;
  }
  const profile: IProfileState = {
    name: 'Tudor', // TODO: get this from backend
    email: credentials.email,
    token: body.token,
  };
  localStorage.setItem('profile', JSON.stringify(profile));
  dispatch(loginSuccess(profile));
  dispatch(loadProfile(profile));
};

const logout = (dispatch: Dispatch<IAuthAction>): void => {
  localStorage.removeItem('profile');
  dispatch(logoutSuccess());
};

const register = (
  credentials: IAuthCredentials,
  dispatch: Dispatch<IAuthAction>,
  callback: () => void,
): void => {
  dispatch(registerRequest(credentials));
  if (credentials.email.length > 0 && credentials.password.length > 0) {
    dispatch(registerSuccess('Please check your email'));
    callback();
  } else {
    dispatch(registerFailure('Could not register'));
  }
};

const isLoggedIn = (): boolean => {
  const userDataJson = localStorage.getItem('profile');
  return userDataJson !== null;
};

const getProfile = (): IProfileState | undefined => {
  const jsonProfile = localStorage.getItem('profile');
  if (jsonProfile) {
    return JSON.parse(jsonProfile) as IProfileState;
  }
  return undefined;
};

const authService = {
  login,
  logout,
  register,
  isLoggedIn,
  getProfile,
};

export default authService;
