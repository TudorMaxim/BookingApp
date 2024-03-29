import * as AWS from 'aws-sdk';
import dynamodbMapper, { EntityType, IDynamoDBItem } from "../utils/DynamoDBMapper";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export interface IBookingAttributes {
    userId?: string;
    serviceId?: string;
    userName?: string;
    serviceName?: string;
    email?: string;
    phone?: string;
    availability?: string;
    duration?: number;
    bookingMatrix?: boolean[][];
    availabilityMatrix?: boolean[][];
    details?: string;
    places?: number;
    price?: number;
    offeredBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class Booking {
    public attributes: IBookingAttributes;

    public constructor(attributes: IBookingAttributes = {}) {
        this.attributes = attributes;
    }

    public static async create({
        userId, serviceId, userName, serviceName, email, phone, offeredBy,
        availability, duration, bookingMatrix, details, places, price, availabilityMatrix,
    }: IBookingAttributes): Promise<Booking> {
        const currentTime = new Date(Date.now()).toISOString();
        const service = new Booking({
            userId,
            serviceId,
            userName,
            serviceName,
            email,
            phone,
            availability,
            duration,
            bookingMatrix,
            details,
            places,
            price,
            offeredBy,
            availabilityMatrix,
            createdAt: currentTime,
            updatedAt: currentTime,
        });
        await service.save();
        return service;
    }

    public async update(attributes: IBookingAttributes): Promise<void> {
        this.removeUndefinded(attributes);
        if (Object.keys(attributes).length === 0) {
            return;
        }
        this.attributes = {
            ...this.attributes,
            ...attributes,
            updatedAt: new Date(Date.now()).toISOString(),
        };
        await this.save();
    }

    private async save(): Promise<void> {
        await dynamodb.put({
            TableName: process.env.DYNAMODB_TABLE!,
            Item: dynamodbMapper.mapEntityToDynamoDBItem(this),
        }).promise();
    }

    public static async find(userId: string, serviceId: string): Promise<Booking | undefined> {
        const result = await dynamodb.query({
            TableName: process.env.DYNAMODB_TABLE!,
            KeyConditionExpression: "#PK = :userId and #SK = :serviceId",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
            ExpressionAttributeValues: {
                ":userId": EntityType.USER + userId,
                ":serviceId": EntityType.BOOKING + serviceId,
            }
        }).promise();
        if (!result.Count || result.Count === 0 || !result.Items) {
            return undefined;
        }
        return dynamodbMapper.mapDynamoDBItemToBooking(result.Items[0] as IDynamoDBItem);
    }

    public static async getForUser(userId: string): Promise<Array<Booking>> {
        const result = await dynamodb.query({
            TableName: process.env.DYNAMODB_TABLE!,
            KeyConditionExpression: "#PK = :userId and begins_with(#SK, :type)",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
            ExpressionAttributeValues: {
                ":userId": EntityType.USER + userId,
                ":type": EntityType.BOOKING,
            }
        }).promise();
        if (!result.Count || result.Count === 0 || !result.Items) {
            return [];
        }
        return result.Items.map(item => dynamodbMapper.mapDynamoDBItemToBooking(item as IDynamoDBItem));
    }

    public static async getForService(serviceId: string): Promise<Array<Booking>> {
        const result = await dynamodb.query({
            TableName: process.env.DYNAMODB_TABLE!,
            IndexName: process.env.BOOKING_USERS_INDEX!,
            KeyConditionExpression: "#SK = :serviceId and begins_with(#PK, :type)",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
            ExpressionAttributeValues: {
                ":serviceId": EntityType.BOOKING + serviceId,
                ":type": EntityType.USER,
            }
        }).promise();
        if (!result.Count || result.Count === 0 || !result.Items) {
            return [];
        }
        return result.Items.map(item => dynamodbMapper.mapDynamoDBItemToBooking(item as IDynamoDBItem));
    }

    public toDTO = (): IBookingAttributes => ({
        userId: this.attributes.userId,
        userName: this.attributes.userName,
        serviceId: this.attributes.serviceId,
        serviceName: this.attributes.serviceName,
        email: this.attributes.email,
        phone: this.attributes.phone,
        duration: this.attributes.duration,
        availability: this.attributes.availability,
        bookingMatrix: this.attributes.bookingMatrix,
        details: this.attributes.details,
        places: this.attributes.places,
        price: this.attributes.price,
        offeredBy: this.attributes.offeredBy,
        availabilityMatrix: this.attributes.availabilityMatrix,
    });

    private removeUndefinded(attributes: IBookingAttributes) {
        Object.keys(attributes).forEach(key => attributes[key] === undefined && delete attributes[key]);
    }
}
