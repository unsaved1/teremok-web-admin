import {imageDto} from '@/data/shared/entity/image';
import * as z from 'zod';

const serviceImageDto = z.looseObject({
    id: z.uuid(),
    sort_order: z.number(),
    image: imageDto,
});

export const serviceDto = z.looseObject({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    service_images: z.array(serviceImageDto),
});

export type TServiceImageDto = z.infer<typeof serviceImageDto>;
export type TServiceDto = z.infer<typeof serviceDto>;

const infoSectionImageDto = z.looseObject({
    id: z.uuid(),
    sort_order: z.number(),
    image: imageDto,
});

export const infoSectionDto = z.looseObject({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    service_ids: z.array(z.string()).default([]),
    services: z.array(serviceDto).default([]),
    info_section_images: z.array(infoSectionImageDto).default([]),
});

export type TInfoSectionImageDto = z.infer<typeof infoSectionImageDto>;
export type TInfoSectionDto = z.infer<typeof infoSectionDto>;
