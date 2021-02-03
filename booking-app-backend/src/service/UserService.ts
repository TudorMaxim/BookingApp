import IUser from '../model/IUser';
import BaseUserService from './BaseUserService';
import * as AWS from 'aws-sdk';

export default class UserService extends BaseUserService {
    private s3 = new AWS.S3();

    public async findUserByEmail(email: string): Promise<IUser> {
        const result = await this.usersRepository.findUserByEmail(email);
        if (!result.Items || !result.Count || result.Count === 0) {
            throw new Error(`Error: Could not find user with email ${email}.`);
        }
        return result.Items[0] as IUser;
    }

    public async uploadImage(uuid: string, image): Promise<string> {
        return '';
    }

    public async updateUser(user: IUser): Promise<void> {
        const result = await this.usersRepository.updateUser(user);
    }
}