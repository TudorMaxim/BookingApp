import { IFlashState } from '../../context/types';
import { ICommonAction, CommonActionTypes } from './types';

export const setFlash = (payload?: IFlashState): ICommonAction => ({
  type: CommonActionTypes.SET_FLASH,
  payload,
});
