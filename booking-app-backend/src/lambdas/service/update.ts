import { APIGatewayProxyHandler } from "aws-lambda";
import { IServiceAttributes } from '../../model/Service';
import * as middy from 'middy';
import { cors } from "middy/middlewares";
import apiResponse from "../../utils/APIResponse";
import serviceController from "../../controller/ServiceController";

const updateService: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing userId!' }
        });
    }
    try {
        const body = JSON.parse(event.body) as IServiceAttributes;
        const service = await serviceController.update(body);
        return apiResponse.success({
            body: service.toDTO(),
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(updateService).use(cors());
