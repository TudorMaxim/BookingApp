import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export interface IUserAttributes {
    uuid?: string;
    name?: string;
    email?: string;
    password?: string;
    activated?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default class User {
    public readonly attributes: IUserAttributes

    public constructor(attributes: IUserAttributes = {}) {
        this.attributes = attributes;
    }

    public static async create(name: string, email: string, password: string): Promise<User> {
        const currentTime = new Date(Date.now()).toISOString()
        const user = new User({
            uuid: uuid(),
            name, 
            email,
            password,
            activated: false,
            createdAt: currentTime,
            updatedAt: currentTime
        });
        await user.save();
        return user;
    }

    public async save(): Promise<void> {
        await dynamodb.put({
            TableName: process.env.USERS_TABLE!,
            Item: this.attributes
        }).promise();
    }

    public static async activateAccount(uuid: string): Promise<void> {
        await dynamodb.update({
            TableName: process.env.USERS_TABLE!,
            Key: { uuid },
            UpdateExpression: "set activated = :activated, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":activated": true,
                ":updatedAt": new Date(Date.now()).toISOString()
            },
            ReturnValues: "NONE"
        }).promise();
    }

    public static async findByEmail(email: string): Promise<User | undefined> {
        const result = await dynamodb.query({
            TableName: process.env.USERS_TABLE!,
            IndexName: process.env.USERS_EMAIL_INDEX!,
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        }).promise();
        if (!result.Items || !result.Count || result.Count === 0) {
            return undefined;
        }
        return new User(result.Items[0]);
    }

    public static async findById(uuid: string): Promise<User> {
        const result = await dynamodb.get({
            TableName: process.env.USERS_TABLE!,
            Key: { uuid }
        }).promise();
        if (!result.Item) {
            throw new Error(`Error: User with email ${uuid} does not exist!`);
        }
        return new User(result.Item);
    }

    public static async getAll(): Promise<User[]> {
        const result = await dynamodb.scan({
            TableName: process.env.USERS_TABLE!
        }).promise();
        if (!result.Items) {
            return [];
        }
        return result.Items.map(attributes => new User(attributes));
    }
}