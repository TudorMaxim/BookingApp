import { IProfileState } from '../context/types';

export enum StorageKeys {
  TOKEN = 'TOKEN',
  PROFILE = 'PROFILE',
}

const getToken = (): string | null => (
  localStorage.getItem(StorageKeys.TOKEN)
);

const setToken = (token: string): void => {
  localStorage.setItem(StorageKeys.TOKEN, token);
};

const getProfile = (): IProfileState | undefined => {
  const jsonProfile = localStorage.getItem(StorageKeys.PROFILE);
  if (jsonProfile) {
    return JSON.parse(jsonProfile) as IProfileState;
  }
  return undefined;
};

const setProfile = (profile: IProfileState): void => {
  localStorage.setItem(StorageKeys.PROFILE, JSON.stringify(profile));
};

const clear = (): void => {
  localStorage.removeItem(StorageKeys.TOKEN);
  localStorage.removeItem(StorageKeys.PROFILE);
};

const storage = {
  getToken,
  setToken,
  getProfile,
  setProfile,
  clear,
};

export default storage;
