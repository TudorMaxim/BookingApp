import { IProfileState } from '../../context/types';

export enum ProfileActionTypes {
    LOAD_PROFILE = 'LOAD_PROFILE',
    UPDATE_INPUT = 'UPDATE_INPUT',
    UPDATE_IMAGE = 'UPDATE_IMAGE',
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
}
