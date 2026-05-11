import type {AuthRepository} from '@/domain/entity/auth/repository';
import {
    logoutInputDto,
    refreshInputDto,
    signinInputDto,
    signupInputDto,
    type TLogoutInputDto,
    type TResfreshInputDto,
    type TSigninInputDto,
    type TSignupInputDto,
} from '.';

export function signinInputToDto([data]: Parameters<AuthRepository['signin']>): TSigninInputDto {
    return signinInputDto.parse(data);
}

export function signupInputToDto([data]: Parameters<AuthRepository['signup']>): TSignupInputDto {
    return signupInputDto.parse(data);
}

export function refreshInputToDto([data]: Parameters<
    AuthRepository['refresh']
>): TResfreshInputDto {
    return refreshInputDto.parse(data);
}

export function logoutInputToDto([data]: Parameters<AuthRepository['logout']>): TLogoutInputDto {
    return logoutInputDto.parse(data);
}
