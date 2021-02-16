import { Dispatch } from 'react';
import { IAuthAction, IAuthCredentials } from '../auth/actions/types';
import {
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
  logoutSuccess, activateSuccess, activateFailure, activateRequest,
} from '../auth/actions';
import { IProfileState } from '../context/types';
import { fetchProfileSuccess, clearProfile } from '../profile/actions';
import { IProfileAction } from '../profile/actions/types';
import storage from '../utils/storage';
import { IAction } from '../context/rootReducer';

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
  const profile = body.user as IProfileState;
  const token = body.token as string;
  storage.setToken(token);
  storage.setProfile(profile);
  dispatch(loginSuccess(token));
  dispatch(fetchProfileSuccess(profile));
};

const logout = (message: string, dispatch: Dispatch<IAction>): void => {
  storage.clear();
  dispatch(clearProfile());
  dispatch(logoutSuccess(message));
};

const register = async (
  credentials: IAuthCredentials,
  dispatch: Dispatch<IAuthAction>,
): Promise<void> => {
  dispatch(registerRequest(credentials));
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    dispatch(registerFailure(responseBody.message));
    return;
  }
  dispatch(registerSuccess('Nice! Please check your email to activate your account.'));
};

const activateAccount = async (id: string, dispatch: Dispatch<IAuthAction>): Promise<void> => {
  dispatch(activateRequest(id));
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    dispatch(activateFailure(responseBody.message));
    return;
  }
  dispatch(activateSuccess(responseBody.message));
};

const authService = {
  login,
  logout,
  register,
  activateAccount,
};

export default authService;
