import { IProfileAction, ProfileActionTypes } from './types';
import { IProfileState } from '../../context/types';

export const loadProfile = (payload: IProfileState): IProfileAction => ({
  type: ProfileActionTypes.LOAD_PROFILE,
  payload,
});
