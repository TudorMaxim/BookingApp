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
    case ProfileActionTypes.UPDATE_FAILURE:
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
    default:
      return state;
  }
};

export default profileReducer;
