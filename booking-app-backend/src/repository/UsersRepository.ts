import * as AWS from 'aws-sdk'; 
import IUser from '../model/IUser';
import { v4 as uuid } from 'uuid';
import { userInfo } from 'os';

export default class UsersRepository {
    private dynamodb = new AWS.DynamoDB.DocumentClient();

    public async createUser(name: string, email: string, password: string): Promise<IUser> {
        const user: IUser = {
            uuid: uuid(),
            name,
            email,
            password,
            validated: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
        };
        return this.dynamodb.put({
            TableName: process.env.USERS_TABLE!,
            Item: user
        }).promise().then(_ => user);
    }

    public async validateUser(uuid: string) {
        return this.dynamodb.update({
            TableName: process.env.USERS_TABLE!,
            Key: { uuid },
            UpdateExpression: "set validated = :validated, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":validated": true,
                ":updatedAt": new Date(Date.now()).toISOString()
            },
            ReturnValues: "UPDATED_NEW"
        }).promise();
    }

    public async findUserByEmail(email: string) {
        return this.dynamodb.query({
            TableName: process.env.USERS_TABLE!,
            IndexName: process.env.USERS_EMAIL_INDEX!,
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        }).promise();
    }

    public async findUserById(uuid: string) {
        return this.dynamodb.query({
            TableName: process.env.USERS_TABLE!,
            KeyConditionExpression: "#id = :uuid",
            ExpressionAttributeNames: {
                "#id": "uuid"
            },
            ExpressionAttributeValues: {
                ":uuid": uuid
            }
        }).promise();
    }

    public async updateUser(user: IUser) {
        return this.dynamodb.update({
            TableName: process.env.USERS_TABLE!,
            Key: {
                uuid: user.uuid
            },
            UpdateExpression: "set name = :name company = :company description = :description updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":name": user.name,
                "company": user.company,
                "description": user.description,
                ":updatedAt": new Date(Date.now()).toISOString(),
            }
        }).promise();
    }
    public async getAllUsers() {
        return this.dynamodb.scan({
            TableName: process.env.USERS_TABLE!
        }).promise();
    }
}