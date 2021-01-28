import { AuthActionTypes, IAuthCredentials, IAuthAction } from './types';
import { IProfileState } from '../../context/types';

export const loginRequest = (payload: IAuthCredentials): IAuthAction => ({
  type: AuthActionTypes.LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: IProfileState): IAuthAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  message: 'Welcome!',
  payload,
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

export const logoutSuccess = (): IAuthAction => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});
