import { APIGatewayProxyHandler } from "aws-lambda";
import middy = require("middy");
import { cors } from "middy/middlewares";
import User from '../../model/User';
import apiResponse from "../../utils/APIResponse";

const getProfile: APIGatewayProxyHandler = async event => {
    if (!event.queryStringParameters || !event.queryStringParameters.id) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing used id!' }
        });
    }
    try {
        const user = await User.findById(event.queryStringParameters.id);
        return apiResponse.success({
            body: user.toDTO()
        });
    } catch(err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(getProfile).use(cors());