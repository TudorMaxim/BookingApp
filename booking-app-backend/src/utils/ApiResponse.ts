import { APIGatewayProxyResult } from "aws-lambda";

interface IAPIResponseData {
    body: any;
    headers?: any;
}

interface IAPIResponse extends IAPIResponseData {
    status: number;
}

class APIResponse {
    public success = ({ body, headers }: IAPIResponseData): APIGatewayProxyResult => (this.response({
        status: 200,
        body,
        headers,
    }));

    public badRequest = ({ body, headers }: IAPIResponseData): APIGatewayProxyResult => (this.response({
        status: 400,
        body,
        headers,
    }));

    private response = ({ status, body, headers }: IAPIResponse): APIGatewayProxyResult => ({
        statusCode: status,
        body: JSON.stringify(body, null, 2),
        headers: headers
    });
}

const apiResponse = new APIResponse();

export default apiResponse;
