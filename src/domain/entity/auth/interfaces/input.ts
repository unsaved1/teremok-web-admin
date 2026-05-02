import type {IUser} from '../../user';

export interface ISigninInput {
    email: IUser['email'];
    password: string;
}

export interface ISignupInput {
    email: IUser['email'];
    password: string;
}

export interface ILogoutInput {
    access_token: string;
    refresh_token: string;
}

export interface IRefreshInput {
    refresh_token: string;
}
