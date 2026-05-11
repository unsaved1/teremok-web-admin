import {EUserRoles, type IUser} from '@/domain/entity/user';
import {EUserRolesDto, type TUserDto} from '.';

export function userRoleDtoToDomain(data: EUserRolesDto): EUserRoles {
    switch (data) {
        case EUserRolesDto.USER:
            return EUserRoles.USER;
        case EUserRolesDto.ADMIN:
            return EUserRoles.ADMIN;
    }
}

export function userDtoToDomain(data: TUserDto): IUser {
    return {
        id: data.id,
        role: userRoleDtoToDomain(data.role),
        email: data.email,
        created_at: data.created_at,
        updated_at: data.updated_at,
    };
}
