export interface IFlashState {
    message?: string;
    success?: boolean;
}
export interface IAuthState extends IFlashState {
    isLoading: boolean;
    isAuthenticated: boolean;
    isRegistered: boolean;
    isActivated: boolean;
    token: string;
}

export interface IProfileState extends IFlashState {
    id?: string;
    name: string;
    email: string;
    company?: string;
    description?: string;
    hasImage?: boolean;
    imageKey?: string;
    image?: File;
    isLoading: boolean;
}

export interface IServiceState {
    id?: string;
    userId?: string;
    name?: string;
    details?: string;
    availability?: string;
    places?: number;
    duration?: number; // duration in minutes
    price?: number;
    availabilityMatrix?: boolean[][];
    offeredBy?: string;
}

export interface IDashboardState extends IFlashState {
    services: IServiceState[];
    isLoading: boolean;
}

export interface IState {
    auth: IAuthState;
    profile: IProfileState;
    dashboard: IDashboardState;
}
