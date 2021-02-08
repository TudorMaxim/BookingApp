export interface IAuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    isRegistered: boolean;
    isActivated: boolean;
    message?: string;
}

export interface IProfileState {
    id?: string;
    name: string;
    email: string;
    token: string;
    company?: string;
    description?: string;
    imageURL?: string;
    image?: File;
}

export interface IState {
    auth: IAuthState;
    profile: IProfileState;
}
