import { IProfileState } from '../context/types';

const getProfile = (): IProfileState | undefined => {
  const jsonProfile = localStorage.getItem('profile');
  if (jsonProfile) {
    return JSON.parse(jsonProfile) as IProfileState;
  }
  return undefined;
};

const uploadImage = async (image: File | undefined): Promise<void> => {
  if (!image) {
    return;
  }
  console.log(image);
  const data = new FormData();
  const profile = getProfile();
  data.append('image', image);
  data.append('id', profile!.id!);
  const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/profile`, {
    headers: {
      Authorization: `Bearer ${profile?.token}`,
    },
    method: 'POST',
    body: data,
  });
  const body = await response.json();
  console.log(response.status, body);
};

const profileService = {
  getProfile,
  uploadImage,
};

export default profileService;
