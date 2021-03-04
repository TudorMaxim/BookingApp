import { Dispatch } from 'react';
import authService from './auth.service';
import imagesService from './images.service';
import { IProfileState } from '../context/types';
import { updateFailure, updateRequest, updateSuccess } from '../profile/actions';
import { IAction } from '../context/rootReducer';
import storage from '../utils/storage';

interface IUpdateRequestBody {
  id: string;
  name?: string;
  company?: string;
  description?: string;
  mimeType?: string;
}

const getUpdateRequestBody = (profile: IProfileState): IUpdateRequestBody => {
  const {
    id, name, company, description, image,
  } = profile;
  let requestBody: IUpdateRequestBody = {
    id: id as string,
    name,
    company,
    description,
  };
  if (image) {
    requestBody = {
      ...requestBody,
      mimeType: image.type,
    };
  }
  return requestBody;
};

const updateProfile = async (
  profile: IProfileState,
  token: string,
  dispatch: Dispatch<IAction>,
): Promise<void> => {
  dispatch(updateRequest());
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/profile`, {
    method: 'POST',
    body: JSON.stringify(getUpdateRequestBody(profile)),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  if (response.ok) {
    if (body.imageUploadURL && profile.image) {
      await imagesService.uploadToS3(body.imageUploadURL, profile.image);
    }
    dispatch(updateSuccess(body.user, 'Profile updated successfully!'));
    storage.setProfile(body.user);
  } else if (response.status === 401) {
    authService.logout('Your session expired. Please login again', dispatch);
    storage.clear();
  } else {
    dispatch(updateFailure(body.message));
  }
};

const profileService = {
  updateProfile,
};

export default profileService;
