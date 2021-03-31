import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import dynamodbMapper, { EntityType, IDynamoDBItem } from '../utils/DynamoDBMapper';

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
            TableName: process.env.DYNAMODB_TABLE!,
            Item: dynamodbMapper.mapEntityToDynamoDBItem(this),
        }).promise();
    }

    public static async activateAccount(id: string): Promise<void> {
        await dynamodb.update({
            TableName: process.env.DYNAMODB_TABLE!,
            Key: {
                PK: dynamodbMapper.getDynamoDBKey(id, EntityType.USER),
                SK: dynamodbMapper.getDynamoDBKey(id, EntityType.USER),
            },
            ConditionExpression: "PK = :PK and SK = :SK",
            UpdateExpression: "set activated = :activated, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":PK": dynamodbMapper.getDynamoDBKey(id, EntityType.USER),
                ":SK": dynamodbMapper.getDynamoDBKey(id, EntityType.USER),
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
            TableName: process.env.DYNAMODB_TABLE!,
            IndexName: process.env.USERS_EMAIL_INDEX!,
            KeyConditionExpression: "email = :email and begins_with(#PK, :type)",
            ExpressionAttributeValues: {
                ":email": email,
                ":type": EntityType.USER,
            },
            ExpressionAttributeNames: {
                "#PK": "PK",
            },
        }).promise();
        if (!result.Items || !result.Count || result.Count === 0) {
            return undefined;
        }
        const isUserKey = (key: string): boolean => key.startsWith(EntityType.USER);
        let users = result.Items.filter(item => isUserKey(item['PK']) && isUserKey(item['SK']));
        if (users.length === 0) {
            return undefined;
        }
        return dynamodbMapper.mapDynamoDBItemToUser(users[0] as IDynamoDBItem);
    }

    public static async findById(id: string): Promise<User> {
        const result = await dynamodb.get({
            TableName: process.env.DYNAMODB_TABLE!,
            Key: {
                PK: dynamodbMapper.getDynamoDBKey(id, EntityType.USER),
                SK: dynamodbMapper.getDynamoDBKey(id, EntityType.USER),
            }
        }).promise();
        if (!result.Item) {
            throw new Error(`Error: User with id ${id} does not exist!`);
        }
        return dynamodbMapper.mapDynamoDBItemToUser(result.Item as IDynamoDBItem);
    }

    public toDTO = (): IUserAttributes => ({
        id: this.attributes.id,
        name: this.attributes.name,
        email: this.attributes.email,
        company: this.attributes.company,
        description: this.attributes.description,
        hasImage: this.attributes.hasImage,
        imageKey: this.attributes.imageKey,
    });
    
    private removeUndefinded(attributes: IUserAttributes) {
        Object.keys(attributes).forEach(key => attributes[key] === undefined && delete attributes[key]);
    }
}