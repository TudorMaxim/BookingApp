import { Dispatch } from 'react';
import {
  fetchServicesRequest, fetchServicesSuccess, fetchServicesFailure,
  addServiceRequest, addServiceSuccess, addServiceFailure,
  updateServiceRequest, updateServiceSuccess, updateServiceFailure,
  deleteServiceRequest, deleteServiceSuccess, deleteServiceFailure,
} from '../dashboard/actions';
import { IAction } from '../context/rootReducer';
import { IServiceState } from '../context/types';
import { MessageTypes } from '../common/actions/types';
import storage from '../utils/storage';
import authService from './auth.service';
import { setFlash } from '../common/actions';

const fetchServices = async (dispatch: Dispatch<IAction>): Promise<void> => {
  dispatch(fetchServicesRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/services/all`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    dispatch(fetchServicesSuccess(body));
  } else if (response.status === 401) {
    authService.logout(MessageTypes.SESSION_EXPIRED, dispatch);
  } else {
    dispatch(fetchServicesFailure(body.message));
  }
};

const addService = async (
  service: IServiceState,
  dispatch: Dispatch<IAction>,
): Promise<boolean> => {
  dispatch(addServiceRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/services`, {
    method: 'POST',
    body: JSON.stringify(service),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    dispatch(addServiceSuccess(body));
    dispatch(setFlash({
      message: MessageTypes.SERVICE_CREATE_SUCCESS,
      success: true,
    }));
    return true;
  }
  if (response.status === 401) {
    authService.logout(MessageTypes.SESSION_EXPIRED, dispatch);
    dispatch(setFlash({
      message: MessageTypes.SESSION_EXPIRED,
      success: false,
    }));
  } else {
    dispatch(addServiceFailure(body.message));
    dispatch(setFlash({
      message: body.message,
      success: false,
    }));
  }
  return false;
};

const updateService = async (
  service: IServiceState,
  dispatch: Dispatch<IAction>,
): Promise<boolean> => {
  dispatch(updateServiceRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/services`, {
    method: 'PATCH',
    body: JSON.stringify(service),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    dispatch(updateServiceSuccess(body));
    dispatch(setFlash({
      message: 'Service updated successfully!',
      success: true,
    }));
    return true;
  }
  if (response.status === 401) {
    authService.logout(MessageTypes.SESSION_EXPIRED, dispatch);
    dispatch(setFlash({
      message: MessageTypes.SESSION_EXPIRED,
      success: false,
    }));
  } else {
    dispatch(updateServiceFailure(body.message));
    dispatch(setFlash({
      message: body.message,
      success: false,
    }));
  }
  return false;
};

const deleteService = async (
  service: IServiceState,
  dispatch: Dispatch<IAction>,
): Promise<boolean> => {
  dispatch(deleteServiceRequest());
  const token = storage.getToken();
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/services`, {
    method: 'DELETE',
    body: JSON.stringify(service),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    dispatch(deleteServiceSuccess(service));
    dispatch(setFlash({
      message: MessageTypes.SERVICE_DELETE_SUCCESS,
      success: true,
    }));
    return true;
  }
  if (response.status === 401) {
    authService.logout(MessageTypes.SESSION_EXPIRED, dispatch);
    dispatch(setFlash({
      message: MessageTypes.SESSION_EXPIRED,
      success: false,
    }));
  } else {
    dispatch(deleteServiceFailure(body.message));
    dispatch(setFlash({
      message: body.message,
      success: false,
    }));
  }
  return false;
};

const dashboardService = {
  fetchServices,
  addService,
  updateService,
  deleteService,
};

export default dashboardService;
