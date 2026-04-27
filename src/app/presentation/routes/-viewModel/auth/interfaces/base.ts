import type {IUser} from '@/domain/entity/user';
import type {TAuthIntent} from './intent';
import type {SigninUseCase} from '@/app/useCase/signin';
import type {LogoutUseCase} from '@/app/useCase/logout';

export interface IUnauthState {
    isAuth: false;
    user?: null;
}

export interface IAuthState {
    isAuth: true;
    user: IUser;
}

export type TAuthState = (IAuthState | IUnauthState) & {
    _signinUseCase: SigninUseCase;
    _logoutUseCase: LogoutUseCase;
};

export type TAuthStore = TAuthState & {
    dispatch: (data: TAuthIntent) => Promise<void>;
};
