// TODO: figure out if any other params are needed
export interface IServiceAttributes {
    id?: string;
    userId?: string;
    name?: string;
    details?: string;
    places?: number;
    price?: number;
    availability?: string;
    availabilityMatrix?: boolean[][];
}

export default class Booking {
    public attributes: IServiceAttributes;

    public constructor(attributes: IServiceAttributes = {}) {
        this.attributes = attributes;
    }
}
