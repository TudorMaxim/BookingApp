import { DashboardActionTypes, IDashboardAction } from './types';
import { IServiceState } from '../../context/types';

export const fetchServicesRequest = (): IDashboardAction => ({
  type: DashboardActionTypes.FETCH_SERVICES_REQUEST,
});

export const fetchServicesSuccess = (payload: IServiceState[]): IDashboardAction => ({
  type: DashboardActionTypes.FETCH_SERVICES_SUCCESS,
  payload,
});

export const fetchServicesFailure = (message: string): IDashboardAction => ({
  type: DashboardActionTypes.FETCH_SERVICES_FAILURE,
  message,
});

export const addServiceRequest = (): IDashboardAction => ({
  type: DashboardActionTypes.ADD_SERVICE_REQUEST,
});

export const addServiceSuccess = (payload: IServiceState): IDashboardAction => ({
  type: DashboardActionTypes.ADD_SERVICE_SUCCESS,
  payload,
});

export const addServiceFailure = (message: string): IDashboardAction => ({
  type: DashboardActionTypes.ADD_SERVICE_FAILURE,
  message,
});

export const updateServiceRequest = (): IDashboardAction => ({
  type: DashboardActionTypes.UPDATE_SERVICE_REQUEST,
});

export const updateServiceSuccess = (payload: IServiceState): IDashboardAction => ({
  type: DashboardActionTypes.UPDATE_SERVICE_SUCCESS,
  payload,
});

export const updateServiceFailure = (message: string): IDashboardAction => ({
  type: DashboardActionTypes.UPDATE_SERVICE_FAILURE,
  message,
});

export const deleteServiceRequest = (): IDashboardAction => ({
  type: DashboardActionTypes.DELETE_SERVICE_REQUEST,
});

export const deleteServiceSuccess = (payload: IServiceState): IDashboardAction => ({
  type: DashboardActionTypes.DELETE_SERVICE_SUCCESS,
  payload,
});

export const deleteServiceFailure = (message: string): IDashboardAction => ({
  type: DashboardActionTypes.DELETE_SERVICE_FAILURE,
  message,
});
