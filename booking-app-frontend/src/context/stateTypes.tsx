export interface IAuthState {
    email: string;
    token: string;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface IState {
    auth: IAuthState;
}
