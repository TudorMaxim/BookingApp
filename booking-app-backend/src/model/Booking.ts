// TODO: figure out if any other params are needed
export interface IBookingAttributes {
    userId?: string;
    serviceId?: string;
    email?: string;
    phone?: string;
}

export default class Booking {
    public attributes: IBookingAttributes;

    public constructor(attributes: IBookingAttributes = {}) {
        this.attributes = attributes;
    }
}
