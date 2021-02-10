import { IProfileAction, ProfileActionTypes } from './types';
import { IProfileState } from '../../context/types';

export const fetchProfileSuccess = (payload: IProfileState): IProfileAction => ({
  type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
  payload,
});

export const clearProfile = (): IProfileAction => ({
  type: ProfileActionTypes.CLEAR_PROFILE,
});

export const updateInput = (key: string, value: string): IProfileAction => ({
  type: ProfileActionTypes.UPDATE_INPUT,
  inputPayload: { key, value },
});

export const updateImage = (image: File): IProfileAction => ({
  type: ProfileActionTypes.UPDATE_IMAGE,
  image,
});

export const updateRequest = (): IProfileAction => ({
  type: ProfileActionTypes.UPDATE_REQUEST,
});

export const updateSuccess = (payload: IProfileState, message: string): IProfileAction => ({
  type: ProfileActionTypes.UPDATE_SUCCESS,
  message,
  payload,
});

export const updateFailure = (message: string): IProfileAction => ({
  type: ProfileActionTypes.UPDATE_FAILURE,
  message,
});
