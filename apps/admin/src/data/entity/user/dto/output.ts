import * as z from 'zod';

export enum EUserRolesDto {
    USER = 'user',
    ADMIN = 'admin',
}

export const userDto = z.looseObject({
    id: z.string(),
    email: z.string(),
    role: z.enum(EUserRolesDto),
    created_at: z.date().nullable(),
    updated_at: z.date().nullable(),
});

export type TUserDto = z.infer<typeof userDto>;
