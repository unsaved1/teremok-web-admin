import {imageDto} from '@/data/shared/entity/image/remote';
import {houseDto} from './output';
import * as z from 'zod';

export const getHouseInputDto = z.object({
    house_id: houseDto.shape.id,
});

export const getHouseListInputDto = z.object({
    offset: z.number(),
    limit: z.number(),
});

export const createHouseInputDto = z.object({
    name: z.string(),
    description: z.string().nullable(),
    beds: z.number(),
    price: z.number(),
    image_ids: z.array(imageDto.shape.id).default([]),
});

export const editHouseInputDto = z.object({
    house_id: houseDto.shape.id,
    data: createHouseInputDto,
});

export const deleteHouseInputDto = z.object({
    house_id: houseDto.shape.id,
});

export const addHouseParamInputDto = z.object({
    house_id: houseDto.shape.id,
    key: z.string(),
    value: z.string(),
});

export const removeHouseParamInputDto = z.object({
    house_id: houseDto.shape.id,
    key: z.string(),
});

export type TGetHouseInputDto = z.infer<typeof getHouseInputDto>;
export type TGetHouseListInputDto = z.infer<typeof getHouseListInputDto>;

export type TCreateHouseInputDto = z.infer<typeof createHouseInputDto>;
export type TEditHouseInputDto = z.infer<typeof editHouseInputDto>;
export type TDeleteHouseInputDto = z.infer<typeof deleteHouseInputDto>;
export type TAddHouseParamInputDto = z.infer<typeof addHouseParamInputDto>;
export type TRemoveHouseParamInputDto = z.infer<typeof removeHouseParamInputDto>;
