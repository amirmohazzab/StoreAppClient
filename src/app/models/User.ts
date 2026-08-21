export interface IUser {
    id: string,
    email?: string,
    userName: string,
    nationalCode?: string,
    displayName: string,
    token?: string;
    role?: string,
    permission?: string[],
    isActive: boolean
}

export type Login = {
    phoneNumber: string,
    password: string
}

export type Register = {
    phoneNumber: string,
    password: string,
    displayName: string
}

export interface IUserLike {
    productId : number,
    liked: boolean
}

export class UserParams {
    search: string = '';
    pageSize: number = 5;
    pageNumber: number = 1;
}


