import * as dateFns from 'date-fns';
import typeChecks from '../utils/TypeChecks';
import User from '../model/User';
import Booking, { IBookingAttributes } from '../model/Booking';

class BookingController {

    public getForUser = async (userId: string | undefined): Promise<Booking[]> => {
        if (!userId) {
            throw new Error('Error: Missing required parameter userId!');
        }
        return await Booking.getForUser(userId)
            .then((bookings) => bookings.filter((booking) => this.isThisWeek(booking)));
    };

    public getForService = async (serviceId: string | undefined): Promise<Booking[]> => {
        if (!serviceId) {
            throw new Error('Error: Missing required parameter serviceId!');
        }
        return await Booking.getForService(serviceId)
            .then((bookings) => bookings.filter((booking) => this.isThisWeek(booking)));
    }

    public create = async (body: IBookingAttributes): Promise<Booking> => {
        await this.validateUserExistance(body);
        this.validateServiceId(body);
        this.validateAttributes(body);
        const {
            userId, userName, serviceId, serviceName, phone, duration, availability, bookingMatrix,
        } = body;
        const booking = await Booking.create({
            userId,
            userName,
            serviceId,
            serviceName,
            phone,
            duration,
            availability,
            bookingMatrix,
        });
        return booking;
    };

    private isThisWeek(booking: Booking): boolean {
        const createdAt = booking.attributes.createdAt as string;
        const bookingDate = new Date(createdAt);
        const sunday = dateFns.startOfWeek(Date.now());
        const saturday = dateFns.endOfWeek(Date.now());
        return sunday <= bookingDate && bookingDate <= saturday;
    }

    private validateServiceId = (body: IBookingAttributes): void => {
        const { serviceId } = body;
        if (!serviceId || !typeChecks.isString(serviceId) || serviceId === '') {
            throw new Error('Error: serviceId is required');
        }
    };

    private validateUserExistance = async (body): Promise<User> => {
        const { userId } = body;
        if (!userId || !typeChecks.isString(userId) || userId === '') {
            throw new Error('Error: userId is required');
        }
        return await User.findById(userId as string);
    }

    private validateAttributes = (body: IBookingAttributes): void => {
        const {
            userName, serviceName, duration, phone, bookingMatrix, availability,
        } = body;
        if (!userName || !typeChecks.isString(userName) || userName.length < 3) {
            throw new Error('Error: userName is required and it must have at least 3 characters');
        }
        if (!serviceName || !typeChecks.isString(serviceName) || serviceName.length < 3) {
            throw new Error('Error: serviceName is required and it must have at least 3 characters');
        }
        let phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
        if (!phone || !typeChecks.isString(phone) || !phoneRegex.test(phone)) {
            throw new Error('Error: Invalid phone number');
        }
        if (!availability || !typeChecks.isString(availability)) {
            throw new Error('Error: availability is required');
        }
        if (!duration || !typeChecks.isNumber(duration) || ![30, 60, 90, 120].includes(duration)) {
            throw new Error('Error: Invalid duration. Valid values: 30, 60, 90, 120 minutes');
        }
        if (!bookingMatrix ||
            bookingMatrix.length != 12 ||
            bookingMatrix[0].length != 6 ||
            !typeChecks.isBoolean(bookingMatrix[0][0])) {
            throw new Error('Error: Invalid booking matrix. Must be a matrix of boolean values')
        }
    };
}

const bookingController = new BookingController();
export default bookingController;
