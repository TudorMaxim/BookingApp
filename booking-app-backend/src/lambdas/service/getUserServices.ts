import { APIGatewayProxyHandler } from "aws-lambda";
import * as middy from 'middy';
import { cors } from "middy/middlewares";
import apiResponse from "../../utils/APIResponse";
import serviceController from "../../controller/ServiceController";

const getUserServices: APIGatewayProxyHandler = async event => {
    if (!event.queryStringParameters) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing parameter userId!' }
        });
    }
    try {
        const { userId } = event.queryStringParameters;
        const services = await serviceController.getForUser(userId).then((services) => {
            return services.sort((a, b) => {
                if (!a.attributes.updatedAt || !b.attributes.updatedAt) return 0;
                return a.attributes.updatedAt > b.attributes.updatedAt ? -1 : 1;
            });
        });
        return apiResponse.success({
            body: services.map(service => service.toDTO()),
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(getUserServices).use(cors());
