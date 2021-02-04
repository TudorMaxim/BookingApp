import { APIGatewayProxyResult } from "aws-lambda";

interface IAPIResponse {
    status: number;
    body: any;
    headers?: any;
}

class APIResponse {
    public response = ({ status, body, headers }: IAPIResponse): APIGatewayProxyResult => ({
        statusCode: status,
        body: JSON.stringify(body, null, 2),
        headers: headers
    });
}

const api = new APIResponse();

export default api;