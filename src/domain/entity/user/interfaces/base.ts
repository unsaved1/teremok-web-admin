import type {Nullable} from '@/shared/types';

export enum EUserRoles {
    USER = 'user',
    ADMIN = 'admin',
}

export interface IUser {
    id: string;
    email: string;
    role: EUserRoles;
    created_at: Nullable<Date>;
    updated_at: Nullable<Date>;
}
