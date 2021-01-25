import IUser from '../model/IUser';
import BaseUserService from './BaseUserService';

export default class UserService extends BaseUserService {
    
    async findUserByEmail(email: string): Promise<IUser> {
        const result = await this.usersRepository.findUserByEmail(email);
        if (!result.Items || !result.Count || result.Count === 0) {
            throw new Error(`Error: Could not find user with email ${email}.`);
        }
        return result.Items[0] as IUser;
    }
}