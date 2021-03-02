import User, { IUserAttributes } from '../model/User';
import Service, { IServiceAttributes } from '../model/Service';
import Booking from '../model/Booking';

export enum EntityType {
    USER = 'USER#',
    SERVICE = "SERVICE#",
    BOOKING = "BOOKING#",
}

export interface IDynamoDBItem {
    PK: string;
    SK: string;
    [key: string]: any;
}

type Entity = User | Service | Booking;

const getId = (value: string): string => value.split('#')[1];

const getDynamoDBKey = (value: string, type: EntityType): string => type + value;

const mapUserToDynamoDBItem = (user: User): IDynamoDBItem => {
    let item: IDynamoDBItem = {
        ...user.attributes,
        PK: EntityType.USER + (user.attributes.id as string),
        SK: EntityType.USER + (user.attributes.id as string),
    };
    delete item.id;
    return item;
};

const mapServiceToDynamoDBItem = (service: Service): IDynamoDBItem => {
    let item: IDynamoDBItem = {
        ...service.attributes,
        PK: EntityType.USER + (service.attributes.userId as string),
        SK: EntityType.SERVICE + (service.attributes.id as string),
    };
    delete item.id;
    delete item.userId;
    return item;
};

const mapBookingToDynamoDBItem = (booking: Booking): IDynamoDBItem => {
    let item: IDynamoDBItem = {
        ...booking.attributes,
        PK: EntityType.USER + (booking.attributes.userId as string),
        SK: EntityType.BOOKING + (booking.attributes.serviceId as string),
    };
    delete item.serviceId;
    delete item.userId;
    return item;
};

const mapEntityToDynamoDBItem = (entity: Entity): IDynamoDBItem => {
    if (entity instanceof User) return mapUserToDynamoDBItem(entity);
    else if (entity instanceof Service) return mapServiceToDynamoDBItem(entity);
    return mapBookingToDynamoDBItem(entity);
};

const mapDynamoDBItemToUser = (item: IDynamoDBItem): User => {
    let attributes: IUserAttributes = {};
    Object.keys(item).forEach(key => {
        if (key === 'PK') attributes.id = getId(item[key]);
        else if (key !== 'SK') attributes[key] = item[key];
    })
    return new User(attributes);
};

const mapDynamoDBItemToService = (item: IDynamoDBItem): Service => {
    let attributes: IServiceAttributes = {};
    Object.keys(item).forEach(key => {
        if (key === 'PK') attributes.userId = getId(item[key]);
        else if (key === 'SK') attributes.id = getId(item[key]);
        else attributes[key] = item[key];
    })
    return new Service(attributes);
};

const dynamodbMapper = {
    getDynamoDBKey,
    mapEntityToDynamoDBItem,
    mapDynamoDBItemToUser,
    mapDynamoDBItemToService,
}

export default dynamodbMapper;
