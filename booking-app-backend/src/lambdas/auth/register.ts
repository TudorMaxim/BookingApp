import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import authController from '../../controller/AuthController';
import emailSender from '../../utils/EmailSender';
import apiResponse from '../../utils/APIResponse';

const register: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: "Error: missing email and password" }
        });
    }
    const { name, email, password } = JSON.parse(event.body);
    try {
        const user = await authController.register(name, email, password);
        await emailSender.sendTo(user);
        return apiResponse.success({
            body: { message: 'Account successfully created!' }
        });
    } catch(err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(register).use(cors());