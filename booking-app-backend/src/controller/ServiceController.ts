import typeChecks from '../utils/TypeChecks';
import User from '../model/User';
import Service, { IServiceAttributes } from '../model/Service';

class ServiceController {

    public getForUser = async (userId: string | undefined): Promise<Service[]> => {
        if (!userId) {
            throw new Error('Error: Missing required parameter userId!');
        }
        return await Service.getForUser(userId);
    };

    public create = async (body: IServiceAttributes): Promise<Service> => {
        const user = await this.validateUserExistance(body);
        this.validateAttributes(body);
        const {
            userId, name, details, duration, places, price, availabilityMatrix,
        } = body;
        const service = await Service.create({
            userId,
            name,
            details,
            duration,
            places,
            price,
            availabilityMatrix,
            offeredBy: user.attributes.company,
        });
        return service;
    };

    public update = async (body: IServiceAttributes): Promise<Service> => {
        await this.validateUserExistance(body);
        this.validateServiceId(body);
        this.validateAttributes(body);
        const {
            id, userId, name, details, duration, places, price, availabilityMatrix,
        } = body;
        const service = await Service.find(id as string, userId as string);
        if (!service) {
            throw new Error(`Error: service with id ${id} does not exist.`);
        }
        await service.update({
            name,
            details,
            duration,
            places,
            price,
            availabilityMatrix,
        });
        return service;
    };

    public delete = async (body: IServiceAttributes): Promise<void> => {
        await this.validateUserExistance(body);
        this.validateServiceId(body);
        const { id, userId } = body;
        const service = await Service.find(id as string, userId as string);
        if (!service) {
            throw new Error(`Error: service with id ${id} does not exist.`);
        }
        await Service.delete(id as string, userId as string);
    };

    private validateServiceId = (body): void => {
        const { id } = body;
        if (!id || !typeChecks.isString(id) || id === '') {
            throw new Error('Error: the id of the service is required');
        }
    };

    private validateUserExistance = async (body): Promise<User> => {
        const { userId } = body;
        if (!userId || !typeChecks.isString(userId) || userId === '') {
            throw new Error('Error: userId is required');
        }
        return await User.findById(userId as string);
    }

    private validateAttributes = (body): void => {
        const {
            name, details, duration, places, price, availabilityMatrix,
        } = body;
        if (!name || !typeChecks.isString(name) || name.length < 3) {
            throw new Error('Error: service name is required and it must have at least 3 characters');
        }
        if (!details || !typeChecks.isString(details) || details.length < 3) {
            throw new Error('Error: service details are required and it must have at least 3 characters');
        }
        if (!duration || !typeChecks.isNumber(duration) || ![30, 60, 90, 120].includes(duration)) {
            throw new Error('Error: Invalid duration. Valid values: 30, 60, 90, 120 minutes');
        }
        if (!places || !typeChecks.isNumber(places) || places < 0) {
            throw new Error('Error: Invalid number of places. Must be a positive integer');
        }
        if (!price || !typeChecks.isNumber(price) || price < 0) {
            throw new Error('Error: Invalid price. Must be a positive integer');
        }
        if (!availabilityMatrix ||
            availabilityMatrix.length != 12 ||
            availabilityMatrix[0].length != 6 ||
            !typeChecks.isBoolean(availabilityMatrix[0][0])) {
            throw new Error('Error: Invalid availability matrix. Must be a matrix of boolean values ')
        }
    };
}

const serviceController = new ServiceController();
export default serviceController;
