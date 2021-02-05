import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import authService from "../../service/AuthService";
import apiResponse from '../../utils/APIResponse';

const login: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing email and password!' }
        });
    }
    const { email, password } = JSON.parse(event.body);
    try {
        const user = await authService.login(email, password);
        const token = authService.getTokenFor(user);
        return apiResponse.success({
            body: {
                auth: true,
                token,
                user: user.toDTO()
            }
        });
    } catch(err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(login).use(cors());