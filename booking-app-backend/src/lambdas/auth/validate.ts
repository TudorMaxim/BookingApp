import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import AuthService from "../../service/AuthService";
import api from "../../utils/ApiResponse";

const validate: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return api.response({
            status: 400,
            body: { message: 'Error: Invalid uuid!' }
        });
    }
    try {
        const { uuid } = JSON.parse(event.body);
        const authService = new AuthService();
        await authService.validateUser(uuid);
        return api.response({
            status: 200, 
            body: { message: 'User validated successfully!' }
        });
    } catch(err) {
        return api.response({
            status: 400,
            body: { message: err.message }
        });
    }
};

export const handler = middy(validate).use(cors());