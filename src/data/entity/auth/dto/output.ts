import * as z from 'zod';
export const tokensDto = z.looseObject({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.string(),
});

export const signinOutputDto = z.looseObject({
    ...tokensDto.shape,
});

export const refreshOutputDto = z.looseObject({
    ...tokensDto.shape,
});

export type TTokensDto = z.infer<typeof tokensDto>;
export type TSigninOutputDto = z.infer<typeof signinOutputDto>;
export type TResfreshOutputDto = z.infer<typeof refreshOutputDto>;
