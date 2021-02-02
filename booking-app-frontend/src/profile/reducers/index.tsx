import { IProfileState } from '../../context/types';
import { IProfileAction, ProfileActionTypes } from '../actions/types';

const profileReducer = (state: IProfileState, action: IProfileAction): IProfileState => {
  switch (action.type) {
    case ProfileActionTypes.LOAD_PROFILE:
      return {
        ...state,
        name: action.payload ? action.payload.name : '',
        email: action.payload ? action.payload.email : '',
        token: action.payload ? action.payload.token : '',
      };
    case ProfileActionTypes.UPDATE_INPUT:
      return {
        ...state,
        [action.inputPayload!.key]: action.inputPayload!.value,
      };
    default:
      return state;
  }
};

export default profileReducer;
