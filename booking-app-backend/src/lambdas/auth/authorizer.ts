import { 
    APIGatewayAuthorizerCallback, APIGatewayTokenAuthorizerEvent, 
    APIGatewayAuthorizerResult, Context
} from 'aws-lambda';
import User from '../../model/User';
import authService from '../../service/AuthService';

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
        const decoded = authService.verify(token);
        const user = await User.findByEmail(decoded.email);
        if (!user) {
            return callback('Unauthorized');
        }
        return callback(null, generateAuthorizerResult(user.attributes.email!, 'Allow', event.methodArn));
    } catch(err) {
        return callback('Unauthorized');
    }
};