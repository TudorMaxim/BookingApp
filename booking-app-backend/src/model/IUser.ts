export default interface IUser {
    uuid: string;
    name: string;
    email: string;
    password: string;
    validated: boolean;
    company?: string;
    description?: string;
    imageURL?: string;
    createdAt?: string;
    updatedAt?: string;
}