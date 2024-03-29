import { CommonActionTypes, ICommonAction } from '../../common/actions/types';
import { IAuthState } from '../../context/types';
import { IAuthAction, AuthActionTypes } from '../actions/types';

const authReducer = (state: IAuthState, action: IAuthAction | ICommonAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_REQUEST:
    case AuthActionTypes.REGISTER_REQUEST:
    case AuthActionTypes.ACTIVATE_REQUEST:
    case AuthActionTypes.RECOVER_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: undefined,
        success: undefined,
      };
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.RECOVER_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.message,
        success: false,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        message: action.message,
        success: true,
        token: action.token as string,
      };
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.RECOVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRegistered: true,
        message: action.message,
        success: true,
      };
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        isRegistered: false,
        token: '',
        message: action.message,
        success: true,
      };
    case AuthActionTypes.ACTIVATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isActivated: true,
        message: action.message,
        success: true,
      };
    case AuthActionTypes.ACTIVATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isActivated: false,
        message: action.message,
        success: false,
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

export default authReducer;
