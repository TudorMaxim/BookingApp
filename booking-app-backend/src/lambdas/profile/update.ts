import { APIGatewayProxyHandler } from "aws-lambda";
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import userController from '../../controller/UserController';
import apiResponse from "../../utils/APIResponse";

interface IBody {
    id?: string;
    name?: string;
    company?: string;
    description?: string;
    mimeType?: string;
}

const validate = (body: IBody) => {
    const { id, name, mimeType } = body;
    if (!id) {
        throw new Error('Error: Missing user id!');
    }
    if (!name) {
        throw new Error('Error: Missing user name!');
    }
    const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (mimeType && !allowedMimeTypes.includes(mimeType)) {
        throw new Error('Error: Invalid file extension! Accepted extensions: .jpeg, .jpg and .png.')
    }
}

const update: APIGatewayProxyHandler = async event => {
    if (!event.body) {
        return apiResponse.badRequest({
            body: { message: 'Error: Missing image and user id!' }
        });
    }
    try {
        const body = JSON.parse(event.body);
        validate(body);
        const user = await userController.update(body);
        let imageUploadURL: string | undefined;
        if (user.attributes.hasImage && body.mimeType) {
            imageUploadURL = userController.getSignedUrl(body.id, body.mimeType)
        }
        return apiResponse.success({
            body: {
                user: user.toDTO(),
                imageUploadURL,
            }
        });
    } catch(err) {
        return apiResponse.badRequest({
            body: { message: err.message }
        });
    }
};

export const handler = middy(update).use(cors());