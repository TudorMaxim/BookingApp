import { IAuthState } from '../../context/stateTypes';
import { AuthActionTypes, IAuthAction } from '../actions';

const authReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        email: action.credentials ? action.credentials.email : '',
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        email: action.userData ? action.userData.email : '',
        token: action.userData ? action.userData.token : '',
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        email: '',
        token: '',
      };
    default:
      return state;
  }
};

export default authReducer;
