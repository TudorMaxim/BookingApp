import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyHandler } from "aws-lambda";
import api from "../../utils/APIResponse";
import User from '../../model/User';

const activate: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return api.response({
            status: 400,
            body: { message: 'Error: Invalid id!' }
        });
    }
    try {
        const { id } = JSON.parse(event.body);
        await User.activateAccount(id);
        return api.response({
            status: 200,
            body: { message: 'Account activated successfully!' }
        });
    } catch(err) {
        return api.response({
            status: 400,
            body: { message: err.message }
        });
    }
};

export const handler = middy(activate).use(cors());