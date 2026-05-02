import {imageDto} from '@/data/shared/entity/image';
import {serviceDto} from './output';
import * as z from 'zod';

export const getServiceInputDto = z.object({
    service_id: serviceDto.shape.id,
});

export const createServiceInputDto = z.object({
    name: z.string(),
    description: z.string().nullable(),
    image_ids: z.array(z.string()).default([]),
});

export const editServiceInputDto = z.object({
    service_id: serviceDto.shape.id,
    data: createServiceInputDto,
});

export const deleteServiceInputDto = z.object({
    service_id: serviceDto.shape.id,
});

export type TGetServiceInputDto = z.infer<typeof getServiceInputDto>;
export type TCreateServiceInputDto = z.infer<typeof createServiceInputDto>;
export type TEditServiceInputDto = z.infer<typeof editServiceInputDto>;
export type TDeleteServiceInputDto = z.infer<typeof deleteServiceInputDto>;

export const getInfoSectionInputDto = z.object({
    info_section_id: z.string(),
});

export const createInfoSectionInputDto = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    service_ids: z.array(z.string()).default([]),
    image_ids: z.array(imageDto.shape.id).default([]),
});

export const editInfoSectionInputDto = z.object({
    info_section_id: z.string(),
    data: createInfoSectionInputDto,
});

export const deleteInfoSectionInputDto = z.object({
    info_section_id: z.string(),
});

export type TGetInfoSectionInputDto = z.infer<typeof getInfoSectionInputDto>;
export type TCreateInfoSectionInputDto = z.infer<typeof createInfoSectionInputDto>;
export type TEditInfoSectionInputDto = z.infer<typeof editInfoSectionInputDto>;
export type TDeleteInfoSectionInputDto = z.infer<typeof deleteInfoSectionInputDto>;
