import { AuthActionTypes, IAuthCredentials, IAuthAction } from './types';

export const loginRequest = (payload: IAuthCredentials): IAuthAction => ({
  type: AuthActionTypes.LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (token: string): IAuthAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  message: 'Welcome!',
  token,
});

export const loginFailure = (message: string): IAuthAction => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  message,
});

export const registerRequest = (payload: IAuthCredentials): IAuthAction => ({
  type: AuthActionTypes.REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (message: string): IAuthAction => ({
  type: AuthActionTypes.REGISTER_SUCCESS,
  message,
});

export const registerFailure = (message: string): IAuthAction => ({
  type: AuthActionTypes.REGISTER_FAILURE,
  message,
});

export const logoutSuccess = (message: string): IAuthAction => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
  message,
});

export const activateRequest = (id: string): IAuthAction => ({
  type: AuthActionTypes.ACTIVATE_REQUEST,
  payload: id,
});

export const activateSuccess = (message: string): IAuthAction => ({
  type: AuthActionTypes.ACTIVATE_SUCCESS,
  message,
});

export const activateFailure = (message: string): IAuthAction => ({
  type: AuthActionTypes.ACTIVATE_FAILURE,
  message,
});
