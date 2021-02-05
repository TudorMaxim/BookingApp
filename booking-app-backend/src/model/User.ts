import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export interface IUserAttributes {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    activated?: boolean;
    company?: string;
    description?: string;
    imageURL?: string;
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
            id: uuid(),
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

    public static async update(attributes: IUserAttributes): Promise<User> {
        const user = new User({
            ...attributes,
            updatedAt: new Date(Date.now()).toISOString()
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

    public static async activateAccount(id: string): Promise<void> {
        await dynamodb.update({
            TableName: process.env.USERS_TABLE!,
            Key: { id },
            ConditionExpression: "id = :id",
            UpdateExpression: "set activated = :activated, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":id": id,
                ":activated": true,
                ":updatedAt": new Date(Date.now()).toISOString()
            },
            ReturnValues: "NONE"
        }).promise().catch(_ => { 
            throw new Error(`Error: Could not activate account with id ${id}!`);
        });
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

    public static async findById(id: string): Promise<User> {
        const result = await dynamodb.get({
            TableName: process.env.USERS_TABLE!,
            Key: { id }
        }).promise();
        if (!result.Item) {
            throw new Error(`Error: User with email ${id} does not exist!`);
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