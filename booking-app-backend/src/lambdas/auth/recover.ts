import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import apiResponse from '../../utils/APIResponse';
import User from '../../model/User';
import emailSender from '../../utils/EmailSender';

const recover: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing email!' }
        });
    }
    const { email } = JSON.parse(event.body);
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new Error('Error: Could not find your account!');
        }
        const newPassword: string = uuid();
        const encryptedPassword = await bcrypt.hash(newPassword, 8);
        await user.update({
            password: encryptedPassword,
        });
        await emailSender.sendRecoveryEmail(email, newPassword);
        return apiResponse.success({
            body: {
                message: 'Account recovered successfully. Please check your email!',
            }
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(recover).use(cors());