import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import dynamodbMapper, { EntityType, IDynamoDBItem } from '../utils/DynamoDBMapper';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const hours = Array.from(Array(12).keys()).map((hour) => {
    let mapped = `${hour + 7}:00`;
    if (hour < 3) {
        mapped = `0${mapped}`;
    }
    return mapped;
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export interface IServiceAttributes {
    id?: string;
    userId?: string;
    name?: string;
    details?: string;
    duration?: number;
    places?: number;
    price?: number;
    availabilityMatrix?: boolean[][];
    availability?: string;
    offeredBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class Service {
    public attributes: IServiceAttributes;

    public constructor(attributes: IServiceAttributes = {}) {
        this.attributes = attributes;
    }

    public static async create({
        userId, name, details, duration, places, price, availabilityMatrix, offeredBy,
    }: IServiceAttributes): Promise<Service> {
        const currentTime = new Date(Date.now()).toISOString();
        const service = new Service({
            id: uuid(),
            userId,
            name,
            details,
            duration,
            places,
            price,
            availabilityMatrix,
            offeredBy,
            createdAt: currentTime,
            updatedAt: currentTime,
        });
        await service.save();
        return service;
    }

    private async save(): Promise<void> {
        await dynamodb.put({
            TableName: process.env.DYNAMODB_TABLE!,
            Item: dynamodbMapper.mapEntityToDynamoDBItem(this),
        }).promise();
    }

    public static async find(id: string, userId: string): Promise<Service | undefined> {
        const result = await dynamodb.query({
            TableName: process.env.DYNAMODB_TABLE!,
            KeyConditionExpression: "#PK = :userId and #SK = :id",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
            ExpressionAttributeValues: {
                ":userId": EntityType.USER + userId,
                ":id": EntityType.SERVICE + id,
            }
        }).promise();
        if (!result.Count || result.Count === 0 || !result.Items) {
            return undefined;
        }
        return dynamodbMapper.mapDynamoDBItemToService(result.Items[0] as IDynamoDBItem);
    }

    public static async getForUser(userId: string): Promise<Array<Service>> {
        const result = await dynamodb.query({
            TableName: process.env.DYNAMODB_TABLE!,
            KeyConditionExpression: "#PK = :userId and begins_with(#SK, :type)",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
            ExpressionAttributeValues: {
                ":userId": EntityType.USER + userId,
                ":type": EntityType.SERVICE,
            }
        }).promise();
        if (!result.Count || result.Count === 0 || !result.Items) {
            return [];
        }
        return result.Items.map(item => dynamodbMapper.mapDynamoDBItemToService(item as IDynamoDBItem))
    }

    public static async getAll(): Promise<Array<Service>> {
        const result = await dynamodb.scan({
            TableName: process.env.DYNAMODB_TABLE!,
            FilterExpression: "begins_with(#PK, :pkType) and begins_with(#SK, :skType)",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
            ExpressionAttributeValues: {
                ":pkType": EntityType.USER,
                ":skType": EntityType.SERVICE,
            }
        }).promise();
        if (!result.Count || result.Count === 0 || !result.Items) {
            return [];
        }
        return result.Items.map(item => dynamodbMapper.mapDynamoDBItemToService(item as IDynamoDBItem))
    }

    public async update(attributes: IServiceAttributes): Promise<void> {
        this.removeUndefinded(attributes);
        if (Object.keys(attributes).length === 0) {
            return;
        }
        this.attributes = {
            ...this.attributes,
            ...attributes,
            updatedAt: new Date(Date.now()).toISOString()
        };
        await this.save();
    }

    public static async delete(id: string, userId: string): Promise<void> {
        await dynamodb.delete({
            TableName: process.env.DYNAMODB_TABLE!,
            Key: {
                PK: EntityType.USER + userId,
                SK: EntityType.SERVICE + id,
            }
        }).promise();
    }

    public toDTO = (): IServiceAttributes => ({
        id: this.attributes.id,
        userId: this.attributes.userId,
        name: this.attributes.name,
        details: this.attributes.details,
        duration: this.attributes.duration,
        places: this.attributes.places,
        price: this.attributes.price,
        offeredBy: this.attributes.offeredBy,
        availability: this.availability,
        availabilityMatrix: this.attributes.availabilityMatrix,
        updatedAt: this.attributes.updatedAt,
    });

    private removeUndefinded(attributes: IServiceAttributes): void {
        Object.keys(attributes).forEach(key => attributes[key] === undefined && delete attributes[key]);
    }

    public get availability(): string {
        let minHour = Infinity;
        let maxHour = -Infinity;
        let minDay = Infinity;
        let maxDay = -Infinity;
        const { availabilityMatrix } = this.attributes;
        if (!availabilityMatrix) return '';
        for (let i = 0; i < availabilityMatrix.length; i += 1) {
            for (let j = 0; j < availabilityMatrix[i].length; j += 1) {
                if (availabilityMatrix[i][j] && i < minHour) minHour = i;
                if (availabilityMatrix[i][j] && i > maxHour) maxHour = i;
                if (availabilityMatrix[i][j] && j < minDay)  minDay = j;
                if (availabilityMatrix[i][j] && j > maxDay)  maxDay = j;
            }
        }
        let availableDays = days[minDay];
        let availableHours = hours[minHour];
        if (minDay !== maxDay) availableDays += `-${days[maxDay]}`;
        if (minHour !== maxHour) availableHours += `-${hours[maxHour]}`;
        return `${availableDays}, ${availableHours}GMT`;
    }
}
