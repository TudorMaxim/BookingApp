import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import authService from '../../service/AuthService';
import api from "../../utils/APIResponse";
import emailSender from '../../utils/EmailSender';

const register: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return api.response({
            status: 400, 
            body: { message: "Error: missing email and password" }
        });
    }
    const { name, email, password } = JSON.parse(event.body);
    try {
        const user = await authService.register(name, email, password);
        await emailSender.sendTo(user);
        return api.response({
            status: 200,
            body: { message: 'Account successfully created!' }
        });
    } catch(err) {
        return api.response({
            status: 400,
            body: { message: err.message }
        });
    }
};

export const handler = middy(register).use(cors());