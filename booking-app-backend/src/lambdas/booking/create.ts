import { APIGatewayProxyHandler } from "aws-lambda";
import * as middy from 'middy';
import { cors } from "middy/middlewares";
import bookingController from "../../controller/BookingController";
import { IBookingAttributes } from "../../model/Booking";
import apiResponse from "../../utils/APIResponse";

const createBooking: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing userId!' }
        });
    }
    try {
        const body = JSON.parse(event.body) as IBookingAttributes;
        const booking = await bookingController.create(body);
        return apiResponse.success({
            body: booking.toDTO(),
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(createBooking).use(cors());
