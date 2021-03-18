import { APIGatewayProxyHandler } from "aws-lambda";
import Service from '../../model/Service';
import * as middy from 'middy';
import { cors } from "middy/middlewares";
import apiResponse from "../../utils/APIResponse";

const getAll: APIGatewayProxyHandler = async _ => {
   const services = await Service.getAll();
    return apiResponse.success({
        body: services.map(service => service.toDTO()),
    });
};

export const handler = middy(getAll).use(cors());
