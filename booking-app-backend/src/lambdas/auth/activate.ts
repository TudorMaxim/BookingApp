import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import apiResponse from "../../utils/APIResponse";
import User from '../../model/User';

const activate: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Invalid id!' }
        });
    }
    try {
        const { id } = JSON.parse(event.body);
        await User.activateAccount(id);
        return apiResponse.success({
            body: { message: 'Account activated successfully!' }
        });
    } catch(err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(activate).use(cors());