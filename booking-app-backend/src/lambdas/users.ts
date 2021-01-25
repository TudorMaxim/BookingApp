import { APIGatewayProxyHandler } from "aws-lambda"
import UsersRepository from "../repository/UsersRepository"

export const handler: APIGatewayProxyHandler = async () => {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.getAllUsers();
    return {
        statusCode: 200,
        body: JSON.stringify({
            users,
        }, null, 2),
    };
}