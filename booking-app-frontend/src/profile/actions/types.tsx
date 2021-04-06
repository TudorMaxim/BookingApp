import { ICommonAction, IInputPayload } from '../../common/actions/types';
import { IFlashState, IProfileState } from '../../context/types';

export enum ProfileActionTypes {
    FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS',
    UPDATE_INPUT = 'UPDATE_INPUT',
    UPDATE_IMAGE = 'UPDATE_IMAGE',
    UPDATE_REQUEST = 'UPDATE_REQUEST',
    UPDATE_SUCCESS = 'UPDATE_SUCCESS',
    UPDATE_FAILURE = 'UPDATE_FAILURE',
    CLEAR_PROFILE = 'CLEAR_PROFILE',
    RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST',
    RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',
}

interface ProfileAction {
    type: ProfileActionTypes;
    payload?: IProfileState | IFlashState;
    inputPayload?: IInputPayload;
    image?: File;
    message?: string;
}

export type IProfileAction = ProfileAction | ICommonAction;
