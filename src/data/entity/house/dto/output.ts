import {imageDto} from '@/data/shared/entity/image/remote';
import {createPaginationDtoSchema} from '@/data/shared/remote/dto';
import * as z from 'zod';

export const houseParamDto = z.looseObject({
    id: z.string(),
    key: z.string(),
    value: z.string(),
});

export const houseDto = z.looseObject({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    beds: z.number(),
    price: z.string(),
    created_at: z.string().nullable(),
    updated_at: z.string().nullable(),
    house_params: z.array(houseParamDto),
    house_images: z.array(imageDto),
});

export const housePaginationDto = createPaginationDtoSchema(houseDto);

export type THouseParamDto = z.infer<typeof houseParamDto>;
export type THouseDto = z.infer<typeof houseDto>;
export type THousePaginationDto = z.infer<typeof housePaginationDto>;
