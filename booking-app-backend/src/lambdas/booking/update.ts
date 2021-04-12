import { APIGatewayProxyHandler } from "aws-lambda";
import * as middy from 'middy';
import { cors } from "middy/middlewares";
import apiResponse from "../../utils/APIResponse";
import Booking from '../../model/Booking';

const updateBooking: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing booking object!' }
        });
    }
    try {
        const booking = JSON.parse(event.body);
        const currentBooking = await Booking.find(booking.userId, booking.serviceId);
        if (!currentBooking) {
            throw new Error(`Error: booking with userId ${booking.userId} and serviceId ${booking.serviceId} does not exist!`);
        }
        currentBooking.update(booking);
        return apiResponse.success({
            body: { message: 'Success' }
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(updateBooking).use(cors());
