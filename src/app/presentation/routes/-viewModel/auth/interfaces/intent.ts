import type {LogoutUseCase} from '@/app/useCase/logout';
import type {SigninUseCase} from '@/app/useCase/signin';

export enum EAuthIntent {
    SIGNIN,
    LOGOUT,
    INIT,
}

export interface IAuthSigninIntent {
    type: EAuthIntent.SIGNIN;
    payload: Parameters<SigninUseCase['execute']>[0];
}

export interface IAuthLogoutIntent {
    type: EAuthIntent.LOGOUT;
    payload: Parameters<LogoutUseCase['execute']>[0];
}

export interface IAuthInitIntent {
    type: EAuthIntent.INIT;
    payload?: null;
}

export type TAuthIntent = IAuthInitIntent | IAuthSigninIntent | IAuthLogoutIntent;
