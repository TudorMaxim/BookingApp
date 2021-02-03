export interface IAuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    isRegistered: boolean;
    isValidated: boolean;
    message?: string;
}

export interface IProfileState {
    uuid?: string;
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
