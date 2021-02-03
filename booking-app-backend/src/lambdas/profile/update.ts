import { APIGatewayProxyHandler } from "aws-lambda";
import api from '../../utils/ApiResponse';
import UserService from '../../service/UserService';
import IUser from '../../model/IUser';

const userService = new UserService();

export const handler: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return api.response({
            status: 401,
            body: { message: 'Error: Missing image and uuid' }
        });
    }
    try {
        const { image } = JSON.parse(event.body);
        const user: IUser = JSON.parse(event.body);
        const imageURL = await userService.uploadImage(user.uuid, image);
        await userService.updateUser({ ...user, imageURL });
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
