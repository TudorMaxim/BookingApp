import { IFlashState } from '../../context/types';

export enum CommonActionTypes {
    SET_FLASH = 'SET_FLASH',
}

export enum MessageTypes {
    SESSION_EXPIRED = 'Your session expired. Please login again!',
    SERVICE_CREATE_SUCCESS = 'Service created successfully!',
    SERVICE_UPDATE_SUCCESS = 'Service updated successfully!',
    SERVICE_DELETE_SUCCESS = 'Service deleted successfully!',
}

export interface IInputPayload {
    key: string;
    value: string | number;
}

export interface ICommonAction {
    type: CommonActionTypes,
    payload?: IFlashState,
}
