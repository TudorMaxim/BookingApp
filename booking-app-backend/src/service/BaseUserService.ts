import * as jwt from 'jsonwebtoken';
import IUser from '../model/IUser';
import UsersRepository from '../repository/UsersRepository';

export default class BaseUserService {
    protected usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    public getTokenFor(user: IUser): string {
        return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: this.getCookieMaxAge()
        });
    }

    public getCookieMaxAge(): number {
        return 24 * 60 * 60 // 24 hours
    }

    async findUserById(uuid: string): Promise<IUser> {
        const result = await this.usersRepository.findUserById(uuid);
        if (!result.Items || !result.Count || result.Count === 0) {
            throw new Error(`Error: Could not find user with uuid ${uuid}.`);
        }
        return result.Items[0] as IUser;
    }
}