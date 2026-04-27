import type {
    ISignupInput,
    ISigninInput,
    ILogoutInput,
    IRefreshInput,
} from '@/domain/entity/auth/interfaces';
import type {IRefreshOutput, ISigninOutput} from '@/domain/entity/auth/interfaces/base';
import type {AuthRepository} from '@/domain/entity/auth/repository';
import type {IUser} from '@/domain/entity/user';
import type {AuthRemoteDataSource} from './ds/remoteImpl.ts';
import {
    logoutInputToDto,
    refreshInputToDto,
    signinInputToDto,
    signupInputToDto,
} from './dto/mapping';
import {userDtoToDomain} from '../user/mapping';
import {refreshOutputDtoToDomain, signinOutputDtoToDomain} from '../house/dto/mapping.ts';

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private remoteDS: AuthRemoteDataSource) {}
    async signup(data: ISignupInput): Promise<IUser> {
        const res = await this.remoteDS.signup(signupInputToDto([data]));
        return userDtoToDomain(res);
    }
    async signin(data: ISigninInput): Promise<ISigninOutput> {
        const res = await this.remoteDS.signin(signinInputToDto([data]));
        return signinOutputDtoToDomain(res);
    }
    async refresh(data: IRefreshInput): Promise<IRefreshOutput> {
        const res = await this.remoteDS.refresh(refreshInputToDto([data]));
        return refreshOutputDtoToDomain(res);
    }
    async logout(data: ILogoutInput): Promise<void> {
        await this.remoteDS.logout(logoutInputToDto([data]));
    }
}
