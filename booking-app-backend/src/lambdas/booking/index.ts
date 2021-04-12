import { APIGatewayProxyHandler } from "aws-lambda";
import * as middy from 'middy';
import { cors } from "middy/middlewares";
import bookingController from "../../controller/BookingController";
import Booking from "../../model/Booking";
import apiResponse from "../../utils/APIResponse";

// /api/bookings?userId={value}&serviceId={value}
const getBookings: APIGatewayProxyHandler = async event => {
    if (!event.queryStringParameters) {
        return apiResponse.badRequest({
            body: { message: 'Error: Please specify userId or serviceId!' }
        });
    }
    try {
        let bookings: Booking[] = [];
        const { userId, serviceId } = event.queryStringParameters;
        if (userId && serviceId) {
            const booking = await Booking.find(userId, serviceId);
            if (booking) bookings = [booking];
        } else if (userId) {
            bookings = await bookingController.getForUser(userId);
        } else if (serviceId) {
            bookings = await bookingController.getForService(serviceId);
        } else {
            return apiResponse.badRequest({
                body: { message: 'Error: Please specify userId or serviceId!' }
            });
        }
        return apiResponse.success({
            body: {
                bookings: bookings.map(booking => booking.toDTO())
            },
        });
    } catch (err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(getBookings).use(cors());
