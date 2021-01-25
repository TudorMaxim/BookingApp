import { APIGatewayProxyResult } from "aws-lambda";

interface IAPIResponse {
    status: number;
    body: any;
    headers?: any;
}

const response = ({ status, body, headers }: IAPIResponse): APIGatewayProxyResult => ({
    statusCode: status,
    body: JSON.stringify(body, null, 2),
    headers: headers
});

const api = {
    response
};
export default api; 