export interface IAuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    isRegistered: boolean;
    isValidated: boolean;
    message?: string;
}

export interface IProfileState {
    name: string;
    email: string;
    token: string;
    company?: string;
    description?: string;
    image?: string;
}

export interface IState {
    auth: IAuthState;
    profile: IProfileState;
}
