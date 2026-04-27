import type {IHouse, IHouseParam} from '@/domain/entity/house/interfaces';
import {
    addHouseParamInputDto,
    createHouseInputDto,
    deleteHouseInputDto,
    editHouseInputDto,
    removeHouseParamInputDto,
    type TAddHouseParamInputDto,
    type TCreateHouseInputDto,
    type TDeleteHouseInputDto,
    type TEditHouseInputDto,
    type THouseDto,
    type THouseParamDto,
    type TRemoveHouseParamInputDto,
} from '.';
import {imageDtoToDomain} from '@/data/shared/entity/image/remote/mapping';
import type {HouseRepository} from '@/domain/entity/house';
import type {TResfreshOutputDto, TSigninOutputDto, TTokensDto} from '../../auth/dto';
import type {IRefreshOutput, ISigninOutput, ITokens} from '@/domain/entity/auth/interfaces/base';

export function houseParamDtoToDomain(data: THouseParamDto): IHouseParam {
    return {
        id: data.id,
        key: data.key,
        value: data.value,
    };
}

export function houseDtoToDomain(data: THouseDto): IHouse {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: parseInt(data.price),
        beds: data.beds,
        house_images: data.house_images.map(imageDtoToDomain),
        house_params: data.house_params.map(houseParamDtoToDomain),
        created_at: data.created_at ? new Date(data.created_at) : null,
        updated_at: data.updated_at ? new Date(data.updated_at) : null,
    };
}

export function tokensDtoToDomain(data: TTokensDto): ITokens {
    return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        tokenType: data.token_type,
    };
}

export function signinOutputDtoToDomain(data: TSigninOutputDto): ISigninOutput {
    return tokensDtoToDomain(data);
}

export function refreshOutputDtoToDomain(data: TResfreshOutputDto): IRefreshOutput {
    return tokensDtoToDomain(data);
}

export function createHouseInputToDto([data]: Parameters<
    HouseRepository['create']
>): TCreateHouseInputDto {
    return createHouseInputDto.parse(data);
}

export function editHouseInputToDto([id, data]: Parameters<
    HouseRepository['edit']
>): TEditHouseInputDto {
    return editHouseInputDto.parse({house_id: id, data: data});
}

export function deleteHouseInputToDto([id]: Parameters<
    HouseRepository['delete']
>): TDeleteHouseInputDto {
    return deleteHouseInputDto.parse({house_id: id});
}

export function addHouseParamInputToDto([id, key, value]: Parameters<
    HouseRepository['addParam']
>): TAddHouseParamInputDto {
    return addHouseParamInputDto.parse({house_id: id, key: key, value: value});
}

export function removeHouseParamInputToDto([id, key]: Parameters<
    HouseRepository['removeParam']
>): TRemoveHouseParamInputDto {
    return removeHouseParamInputDto.parse({house_id: id, key: key});
}
