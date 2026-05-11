import type {ContentRepository} from '@/domain/entity/content';
import type {IContact, IInfoSection, IService} from '@/domain/entity/content/interfaces';
import {
    createInfoSectionInputDto,
    createServiceInputDto,
    deleteInfoSectionInputDto,
    deleteServiceInputDto,
    editInfoSectionInputDto,
    editServiceInputDto,
    type TCreateInfoSectionInputDto,
    type TCreateServiceInputDto,
    type TDeleteInfoSectionInputDto,
    type TDeleteServiceInputDto,
    type TEditInfoSectionInputDto,
    type TEditServiceInputDto,
    type TInfoSectionDto,
    type TServiceDto,
} from '.';
import {imageDtoToDomain} from '@/data/shared/entity/image/remote/mapping';

export function serviceDtoToDomain(data: TServiceDto): IService {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        images: data.service_images.map(item => ({
            id: item.id,
            sortOrder: item.sort_order,
            image: imageDtoToDomain(item.image),
        })),
    };
}

export function createServiceInputToDto([data]: Parameters<
    ContentRepository['createService']
>): TCreateServiceInputDto {
    return createServiceInputDto.parse({
        name: data.name,
        description: data.description,
        image_ids: data.imageIds,
    });
}

export function editServiceInputToDto([id, data]: Parameters<
    ContentRepository['editService']
>): TEditServiceInputDto {
    return editServiceInputDto.parse({
        service_id: id,
        data: createServiceInputToDto([data]),
    });
}

export function deleteServiceInputToDto([id]: Parameters<
    ContentRepository['delete']
>): TDeleteServiceInputDto {
    return deleteServiceInputDto.parse({service_id: id});
}

import {
    contactDto,
    editContactInputDto,
    type TContactDto,
    type TEditContactInputDto,
} from './contact';

export function contactDtoToDomain(data: TContactDto): IContact {
    return contactDto.parse(data);
}

export function editContactInputToDto([data]: Parameters<
    ContentRepository['editContact']
>): TEditContactInputDto {
    return editContactInputDto.parse(data);
}

export function infoSectionDtoToDomain(data: TInfoSectionDto): IInfoSection {
    console.log(data)
    return {
        id: data.id,
        name: data.name,
        title: data.title,
        description: data.description,
        serviceIds: data.service_ids,
        services: data.services.map(serviceDtoToDomain),
        images: data.info_section_images.map(item => ({
            id: item.id,
            sortOrder: item.sort_order,
            image: item.image,
        })),
    };
}

export function createInfoSectionInputToDto([data]: Parameters<
    ContentRepository['createInfoSection']
>): TCreateInfoSectionInputDto {
    return createInfoSectionInputDto.parse({
        name: data.name,
        title: data.title,
        description: data.description,
        service_ids: data.serviceIds,
        image_ids: data.imageIds,
    });
}

export function editInfoSectionInputToDto([id, data]: Parameters<
    ContentRepository['editInfoSection']
>): TEditInfoSectionInputDto {
    return editInfoSectionInputDto.parse({
        info_section_id: id,
        data: createInfoSectionInputToDto([data]),
    });
}

export function deleteInfoSectionInputToDto([id]: Parameters<
    ContentRepository['deleteInfoSection']
>): TDeleteInfoSectionInputDto {
    return deleteInfoSectionInputDto.parse({info_section_id: id});
}
