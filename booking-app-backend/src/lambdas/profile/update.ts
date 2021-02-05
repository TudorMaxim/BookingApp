import { APIGatewayProxyHandler } from "aws-lambda";
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import api from '../../utils/ApiResponse';
import userService from '../../service/UserService';
import { IUserAttributes } from "../../model/User";

const update: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return api.response({
            status: 401,
            body: { message: 'Error: Missing image and id' }
        });
    }
    try {
        const { image } = JSON.parse(event.body);
        const userAtrributes: IUserAttributes = JSON.parse(event.body);
        if (!userAtrributes.id) {
            return api.response({
                status: 401,
                body: { message: 'Error: Missing id of the user'}
            });
        }
        await userService.update(userAtrributes, image);
        return api.response({
            status: 200,
            body: {}
        });
    } catch(err) {
        return api.response({
            status: 401,
            body: { message: err.message }
        });
    }
};

export const handler = middy(update).use(cors());