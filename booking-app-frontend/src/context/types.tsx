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
    bookings?: IBookingState[];
}

export interface IBookingState {
    id?: string;
    userId: string;
    serviceId: string;
    serviceName?: string;
    name: string;
    email: string;
    phoneNumber: string;
    duration: number;
    availability?: string;
    bookingMatrix: boolean[][];
}

export interface IDashboardState extends IFlashState {
    services: IServiceState[];
    isLoading: boolean;
}

export interface IBookingsPageState extends IFlashState {
    isLoading: boolean;
    services: IServiceState[]; // all the services offered by a user and all their bookings.
}

export interface ICalendarState extends IFlashState {
    isLoading: boolean;
    bookings: IBookingState[];
}

export interface IState {
    auth: IAuthState;
    profile: IProfileState;
    dashboard: IDashboardState;
    bookingsPage: IBookingsPageState;
    calendar: ICalendarState;
}
