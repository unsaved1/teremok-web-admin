import type {IUser} from '../user';
import type {ILogoutInput, IRefreshInput, ISigninInput, ISignupInput} from './interfaces';
import type {IRefreshOutput, ISigninOutput} from './interfaces/base';

export interface AuthRepository {
    signup(data: ISignupInput): Promise<IUser>;
    signin(data: ISigninInput): Promise<ISigninOutput>;
    logout(data: ILogoutInput): Promise<void>;
    refresh(data: IRefreshInput): Promise<IRefreshOutput>;
}
