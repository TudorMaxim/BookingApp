import { 
    APIGatewayAuthorizerCallback, APIGatewayTokenAuthorizerEvent, 
    APIGatewayAuthorizerResult, Context
} from 'aws-lambda';
import User from '../../model/User';
import authController from '../../controller/AuthController';

const generateAuthorizerResult = (
    principalId: string, 
    effect: string,
): APIGatewayAuthorizerResult => ({
    principalId, 
    policyDocument: {
        Version: "2012-10-17",
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: '*'
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
        const decoded = authController.verify(token);
        const user = await User.findByEmail(decoded.email);
        if (!user) {
            return callback('Unauthorized');
        }
        return callback(null, generateAuthorizerResult('api', 'Allow'));
    } catch(err) {
        return callback('Unauthorized');
    }
};