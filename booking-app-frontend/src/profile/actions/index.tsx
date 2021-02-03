import { IProfileAction, ProfileActionTypes } from './types';
import { IProfileState } from '../../context/types';

export const loadProfile = (payload: IProfileState): IProfileAction => ({
  type: ProfileActionTypes.LOAD_PROFILE,
  payload,
});

export const updateInput = (key: string, value: string): IProfileAction => ({
  type: ProfileActionTypes.UPDATE_INPUT,
  inputPayload: { key, value },
});

export const updateImage = (image: File): IProfileAction => ({
  type: ProfileActionTypes.UPDATE_IMAGE,
  image,
});
