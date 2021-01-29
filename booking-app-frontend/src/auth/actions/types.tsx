import { IProfileState } from '../../context/types';

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
    username?: string;
    email: string;
    password: string;
}

export interface IAuthAction {
    type: AuthActionTypes;
    payload?: IAuthCredentials | IProfileState;
    message?: string;
}
