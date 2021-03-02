import { APIGatewayProxyHandler } from "aws-lambda";
import { IServiceAttributes } from '../../model/Service';
import * as middy from 'middy';
import { cors } from "middy/middlewares";
import apiResponse from "../../utils/APIResponse";
import serviceController from "../../controller/ServiceController";

const deleteService: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing userId and service id!' }
        });
    }
    try {
        const body = JSON.parse(event.body) as IServiceAttributes;
        await serviceController.delete(body);
        return apiResponse.success({
            body: { message: 'Service successfully deleted!' },
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(deleteService).use(cors());
