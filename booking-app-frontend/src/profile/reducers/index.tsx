import { CommonActionTypes } from '../../common/actions/types';
import { IProfileState } from '../../context/types';
import { IProfileAction, ProfileActionTypes } from '../actions/types';

const profileReducer = (state: IProfileState, action: IProfileAction): IProfileState => {
  switch (action.type) {
    case ProfileActionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case ProfileActionTypes.UPDATE_INPUT:
      return {
        ...state,
        [action.inputPayload!.key]: action.inputPayload!.value,
      };
    case ProfileActionTypes.UPDATE_IMAGE:
      return {
        ...state,
        image: action.image,
      };
    case ProfileActionTypes.UPDATE_REQUEST:
    case ProfileActionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ProfileActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        message: action.message,
        success: true,
      };
    case ProfileActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        success: true,
      };
    case ProfileActionTypes.UPDATE_FAILURE:
    case ProfileActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        success: false,
      };
    case ProfileActionTypes.CLEAR_PROFILE:
      return {
        name: '',
        email: '',
        isLoading: false,
        message: undefined,
        success: undefined,
      };
    case CommonActionTypes.SET_FLASH:
      return {
        ...state,
        message: action.payload?.message,
        success: action.payload?.success,
      };
    default:
      return state;
  }
};

export default profileReducer;
