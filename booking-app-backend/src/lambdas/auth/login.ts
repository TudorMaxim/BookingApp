import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import AuthService from "../../service/AuthService";
import api from "../../utils/ApiResponse";

const authService = new AuthService();

const login: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return api.response({
            status: 401,
            body: { message: 'Error: Missing email and password!' }
        });
    }
    const { email, password } = JSON.parse(event.body);
    try {
        const user = await authService.login(email, password);
        const token = authService.getTokenFor(user);
        return api.response({
            status: 200,
            body: {
                auth: true,
                token,
            }
        });
    } catch(err) {
        return api.response({
            status: 400,
            body: { message: err.message }
        });
    }
};

export const handler = middy(login).use(cors());