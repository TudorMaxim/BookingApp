import * as bcrypt from 'bcryptjs';
import BaseUserService from './BaseUserService';
import IUser from '../model/IUser';

export default class AuthService extends BaseUserService {
    
    public async register(name: string, email: string, password: string): Promise<IUser> {
        this.validateCredentials(email, password);
        const users = await this.usersRepository.findUserByEmail(email);
        if (users.Count && users.Count > 0) {
            throw new Error(`Error: User with email ${email} already exists!`);
        }
        const encryptedPassword = await bcrypt.hash(password, 8);
        return await this.usersRepository.createUser(name, email, encryptedPassword);
    }

    public async validateUser(uuid: string): Promise<void> {
        const user = await this.findUserById(uuid);
        if (user.validated) {
            throw new Error('Error: User already validated!');
        }
        await this.usersRepository.validateUser(uuid);
    }

    public async login(email: string, password: string): Promise<IUser> {
        const users = await this.usersRepository.findUserByEmail(email);
        if (!users.Items || !users.Count || users.Count === 0) {
            throw new Error(`Error: User with email ${email} does not exist!`);
        }
        const user = users.Items[0] as IUser;
        if (!user.validated) {
            throw new Error(`Error: Account with email ${email} is not verified. Please check your email!`);
        }
        const samePassword = await bcrypt.compare(password, user.password);
        if (!samePassword) {
            throw new Error('Error: Invalid password!');
        }
        return user;
    }

    // public logout(email: string) {

    // }

    private validateCredentials(email: string, password: string) {
        this.validateEmail(email);
        this.validatePassword(password);
    }

    private validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid: boolean = regex.test(email);
        if (!valid) {
            throw new Error('Error: Invalid email address!');
        }
    }

    private validatePassword(password: string) {
        if (!password || password.length < 8) {
            throw new Error('Error: the password must be at least 8 characters long!');
        }
    }
}