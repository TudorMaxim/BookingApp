import { IProfileState } from '../../context/types';

export enum ProfileActionTypes {
    FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS',
    UPDATE_INPUT = 'UPDATE_INPUT',
    UPDATE_IMAGE = 'UPDATE_IMAGE',
    UPDATE_REQUEST = 'UPDATE_REQUEST',
    UPDATE_SUCCESS = 'UPDATE_SUCCESS',
    UPDATE_FAILURE = 'UPDATE_FAILURE',
    CLEAR_PROFILE = 'CLEAR_PROFILE'
}

export interface IInputPayload {
    key: string;
    value: string;
}

export interface IProfileAction {
    type: ProfileActionTypes;
    payload?: IProfileState;
    inputPayload?: IInputPayload;
    image?: File;
    message?: string;
}
