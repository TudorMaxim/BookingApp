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
    hasImage?: boolean;
    imageKey?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class User {
    public attributes: IUserAttributes

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

    public async update(attributes: IUserAttributes): Promise<void> {
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
    
    private async save(): Promise<void> {
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
            throw new Error(`Error: User with id ${id} does not exist!`);
        }
        return new User(result.Item);
    }

    public toDTO(): IUserAttributes {
        return {
            id: this.attributes.id,
            name: this.attributes.name,
            email: this.attributes.email,
            company: this.attributes.company,
            description: this.attributes.description,
            hasImage: this.attributes.hasImage,
            imageKey: this.attributes.imageKey,
        };
    }
    
    private removeUndefinded(attributes: IUserAttributes) {
        Object.keys(attributes).forEach(key => attributes[key] === undefined && delete attributes[key]);
    }
}