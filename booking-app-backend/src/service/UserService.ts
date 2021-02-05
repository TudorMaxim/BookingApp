import * as AWS from 'aws-sdk';
import User, { IUserAttributes } from '../model/User';

const s3 = new AWS.S3();

class UserService {

    public async update(userAttributes: IUserAttributes, image): Promise<void> {
        const imageURL = await this.uploadImage(userAttributes.id!, image);
        await User.update({
            ...userAttributes,
            imageURL
        });
    }

    private async uploadImage(id: string, image): Promise<string> {
        return '';
    }
}

const userService = new UserService();

export default userService;
