import { APIGatewayProxyHandler } from "aws-lambda"
import User from "../model/User";
import api from "../utils/APIResponse";

export const handler: APIGatewayProxyHandler = async () => {
    const users = await User.getAll();
    return api.response({
        status: 200,
        body: { users }
    });
}