import { IDashboardState, IServiceState } from '../../context/types';
import { DashboardActionTypes, IDashboardAction } from '../actions/types';
import { CommonActionTypes } from '../../common/actions/types';

const dashboardReducer = (state: IDashboardState, action: IDashboardAction): IDashboardState => {
  switch (action.type) {
    case DashboardActionTypes.ADD_SERVICE_REQUEST:
    case DashboardActionTypes.UPDATE_SERVICE_REQUEST:
    case DashboardActionTypes.DELETE_SERVICE_REQUEST:
    case DashboardActionTypes.FETCH_SERVICES_REQUEST:
    case DashboardActionTypes.SUBMIT_BOOKING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DashboardActionTypes.FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        services: action.payload as IServiceState[],
      };
    case DashboardActionTypes.ADD_SERVICE_SUCCESS:
      return {
        services: [
          action.payload as IServiceState,
          ...state.services,
        ],
        isLoading: false,
      };
    case DashboardActionTypes.UPDATE_SERVICE_SUCCESS:
      return {
        services: state.services.map((service) => {
          const { id } = action.payload as IServiceState;
          if (service.id === id) {
            return action.payload as IServiceState;
          }
          return service;
        }),
        isLoading: false,
      };
    case DashboardActionTypes.DELETE_SERVICE_SUCCESS:
      return {
        isLoading: false,
        services: state.services.filter((service) => {
          const { id } = action.payload as IServiceState;
          return service.id !== id;
        }),
      };
    case DashboardActionTypes.ADD_SERVICE_FAILURE:
    case DashboardActionTypes.UPDATE_SERVICE_FAILURE:
    case DashboardActionTypes.DELETE_SERVICE_FAILURE:
    case DashboardActionTypes.FETCH_SERVICES_FAILURE:
    case DashboardActionTypes.SUBMIT_BOOKING_SUCCESS:
    case DashboardActionTypes.SUBMIT_BOOKING_FAILURE:
      return {
        ...state,
        isLoading: false,
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

export default dashboardReducer;
