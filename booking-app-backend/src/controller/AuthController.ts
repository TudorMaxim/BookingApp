import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../model/User';

interface IDecodedToken {
    email: string;
}

class AuthController {
    
    public async register(name: string, email: string, password: string): Promise<User> {
        this.validateName(name);
        this.validateCredentials(email, password);
        const user = await User.findByEmail(email);
        if (user) {
            throw new Error(`Error: User with email ${email} already exists!`);
        }
        const encryptedPassword = await bcrypt.hash(password, 8);
        return await User.create(name, email, encryptedPassword);
    }

    public async login(email: string, password: string): Promise<User> {
        this.validateCredentials(email, password);
        const user = await User.findByEmail(email);
        if (!user) {
            throw new Error(`Error: User with email ${email} does not exist!`);
        }
        if (!user.attributes.activated) {
            throw new Error(`Error: Account with email ${email} is not activated. Please check your email!`);
        }
        const samePassword = await bcrypt.compare(password, user.attributes.password!);
        if (!samePassword) {
            throw new Error('Error: Invalid password!');
        }
        return user;
    }

    public getTokenFor(user: User): string {
        const payload: IDecodedToken = {
            email: user.attributes.email!
        };
        return jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: this.getCookieMaxAge()
        });
    }

    public verify(token: string): IDecodedToken {
        return jwt.verify(token, process.env.JWT_SECRET!) as IDecodedToken;
    }

    private validateName(name: string) {
        if (!name || name === '') {
            throw new Error('Error: name is required!');
        }
    }

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

    public getCookieMaxAge(): number {
        return 24 * 60 * 60 // 24 hours
    }
}

const authController = new AuthController();
export default authController;
