import * as AWS from 'aws-sdk';
import User, { IUserAttributes } from '../model/User';

const s3 = new AWS.S3();

class UserService {

    public async update(body): Promise<User> {
        const { id, name, company, description, mimeType } = body;
        const user = await User.findById(id!);
        let userAttributes: IUserAttributes = {
            name, 
            company,
            description
        };
        if (mimeType) {
            const extension = mimeType.split('/')[1];
            const key = `images/${id}.${extension}`;
            userAttributes = {
                ...userAttributes,
                hasImage: true,
                imageKey: key,    
            }
        }
        await user.update(userAttributes);
        return user;
    }

    public getSignedUrl(id: string, mimeType: string): string {
        const extension = mimeType.split('/')[1];
        const key = `images/${id}.${extension}`;
        return s3.getSignedUrl('putObject', {
            Bucket: process.env.S3_IMAGES_BUCKET_NAME,
            Key: key,
            ACL: 'public-read',
            ContentType: mimeType
        });
    }
}

const userService = new UserService();

export default userService;
