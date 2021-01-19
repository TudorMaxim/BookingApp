export enum AuthActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE = 'LOGOUT_FAILURE',
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAILURE = 'REGISTER_FAILURE'
}

export interface IAuthCredentials {
    email: string;
    userName?: string;
    password: string;
}

export interface IUserData {
  email: string;
  token: string;
}

export interface IAuthAction {
    type: AuthActionTypes;
    credentials?: IAuthCredentials;
    userData?: IUserData;
    message?: string;
}

export const loginRequest = (credentials: IAuthCredentials): IAuthAction => ({
  type: AuthActionTypes.LOGIN_REQUEST,
  credentials,
});

export const loginSuccess = (userData: IUserData): IAuthAction => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  message: 'Welcome!',
  userData,
});

export const loginFailure = (): IAuthAction => ({
  type: AuthActionTypes.LOGIN_FAILURE,
  message: 'Login failed!',
});

export const registerRequest = (credentials: IAuthCredentials): IAuthAction => ({
  type: AuthActionTypes.REGISTER_REQUEST,
  credentials,
});

export const registerSuccess = (): IAuthAction => ({
  type: AuthActionTypes.REGISTER_SUCCESS,
  message: 'Account created successfully!',
});

export const registerFailure = (): IAuthAction => ({
  type: AuthActionTypes.REGISTER_FAILURE,
  message: 'Could not create account!',
});

export const logoutSuccess = (): IAuthAction => ({
  type: AuthActionTypes.LOGOUT_SUCCESS,
});
