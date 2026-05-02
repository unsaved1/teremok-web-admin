import * as z from 'zod';
import {tokensDto} from './output';

export const signinInputDto = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export const signupInputDto = z.object({
    ...signinInputDto.shape,
});

export const logoutInputDto = z.object({
    access_token: tokensDto.shape.access_token,
    refresh_token: tokensDto.shape.refresh_token,
});

export const refreshInputDto = z.object({
    refresh_token: tokensDto.shape.refresh_token,
});

export type TSigninInputDto = z.infer<typeof signinInputDto>;
export type TSignupInputDto = z.infer<typeof signupInputDto>;
export type TResfreshInputDto = z.infer<typeof refreshInputDto>;
export type TLogoutInputDto = z.infer<typeof logoutInputDto>;
