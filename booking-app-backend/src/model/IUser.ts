export default interface IUser {
    uuid: string;
    name: string;
    email: string;
    password: string;
    validated: boolean;
    createdAt: string;
    updatedAt: string;
}