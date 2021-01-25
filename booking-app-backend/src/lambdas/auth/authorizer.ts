import { 
    APIGatewayAuthorizerCallback, APIGatewayTokenAuthorizerEvent, 
    APIGatewayAuthorizerResult, Context
} from 'aws-lambda';
import UserService from '../../service/UserService';
import * as jwt from 'jsonwebtoken';

const userService = new UserService();

const generateAuthorizerResult = (
    principalId: string, 
    effect: string, 
    resource: string
): APIGatewayAuthorizerResult => ({
    principalId, 
    policyDocument: {
        Version: "2012-10-17",
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
        }]
    }
});

export const handler = async (
    event: APIGatewayTokenAuthorizerEvent,
    _: Context, 
    callback: APIGatewayAuthorizerCallback
): Promise<void> => {
    const [ bearer, token ] = event.authorizationToken.split(' ');
    if (!token || bearer.toLowerCase() !== 'bearer') {
        return callback('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userService.findUserByEmail(decoded.email);
        return callback(null, generateAuthorizerResult(user.email, 'Allow', event.methodArn));
    } catch(err) {
        return callback('Unauthorized');
    }
};