export interface IAuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    isRegistered: boolean;
    isActivated: boolean;
    message?: string;
}

export interface IProfileState {
    name: string;
    email: string;
    token: string;
}

export interface IState {
    auth: IAuthState;
    profile: IProfileState;
}
