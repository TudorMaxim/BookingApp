import { IProfileState } from '../../context/types';
import { IProfileAction, ProfileActionTypes } from '../actions/types';

const profileReducer = (state: IProfileState, action: IProfileAction): IProfileState => {
  switch (action.type) {
    case ProfileActionTypes.LOAD_PROFILE:
      return {
        ...state,
        name: action.payload!.name,
        email: action.payload!.email,
        token: action.payload!.token,
      };
    default:
      return state;
  }
};

export default profileReducer;
