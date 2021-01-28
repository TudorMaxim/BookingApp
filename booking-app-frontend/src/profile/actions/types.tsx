import { IProfileState } from '../../context/types';

export enum ProfileActionTypes {
    LOAD_PROFILE = 'LOAD_PROFILE',
}

export interface IProfileAction {
    type: ProfileActionTypes;
    payload?: IProfileState;
}
