export enum CalendarViewTypes {
    WEEK = 'WEEK',
    MONTH = 'MONTH',
}

export enum CalendarActionTypes {
    FETCH = 'FETCH',
}

export interface ICalendarAction {
    type: CalendarActionTypes;
}
