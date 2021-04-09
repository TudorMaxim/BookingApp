import { APIGatewayProxyHandler } from "aws-lambda";
import * as middy from 'middy';
import * as bcrypt from 'bcryptjs';
import { cors } from 'middy/middlewares';
import User from "../../model/User";
import apiResponse from "../../utils/APIResponse";
import typeChecks from "../../utils/TypeChecks";

const resetPassword: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing user id and new password!' }
        });
    }
    try {
        const { id, password } = JSON.parse(event.body);
        if (!id) {
            throw new Error('Error: Missing user id');
        }
        if (!password || !typeChecks.isString(password) || password.length < 8) {
            throw new Error('Error: Your password must contain at least 8 characters!');
        }
        const user = await User.findById(id);
        if (!user) {
            throw new Error(`Error: User with id ${id} does not exist!`);
        }
        const encryptedPassword = await bcrypt.hash(password, 8);
        user.update({
            password: encryptedPassword
        });
        return apiResponse.success({
            body: {
                message: 'Success!',
            }
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(resetPassword).use(cors());