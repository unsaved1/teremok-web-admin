import {BaseRemoteDataSource} from '@/data/shared/remote';
import {
    refreshOutputDto,
    signinOutputDto,
    type TLogoutInputDto,
    type TResfreshInputDto,
    type TResfreshOutputDto,
    type TSigninInputDto,
    type TSigninOutputDto,
    type TSignupInputDto,
} from '../dto';
import {userDto, type TUserDto} from '../../user';

export class AuthRemoteDataSource extends BaseRemoteDataSource {
    public prefix = '/pub/auth';

    async signin(data: TSigninInputDto): Promise<TSigninOutputDto> {
        const res = await this.rpcCall('auth.login', data);
        return signinOutputDto.parse(res);
    }

    async signup(data: TSignupInputDto): Promise<TUserDto> {
        const res = await this.rpcCall('auth.register', data);
        return userDto.parse(res);
    }

    async refresh(data: TResfreshInputDto): Promise<TResfreshOutputDto> {
        const res = await this.rpcCall('auth.refresh', data);
        return refreshOutputDto.parse(res);
    }

    async logout(data: TLogoutInputDto): Promise<void> {
        await this.rpcCall('auth.logout', data);
    }
}
