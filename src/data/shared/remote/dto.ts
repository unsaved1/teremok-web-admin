import * as z from 'zod';

export const paginationInfoDto = z.looseObject({
    offset: z.number(),
    limit: z.number(),
    total: z.number(),
});

export function createPaginationDtoSchema<T extends z.ZodType>(itemSchema: T) {
    return z.looseObject({
        items: z.array(itemSchema),
        info: paginationInfoDto,
    });
}

export type TPaginationInfoDto = z.infer<typeof paginationInfoDto>;
export type TPaginationDto<T extends z.infer<z.ZodType>> = {
    items: Array<T>;
    info: TPaginationInfoDto;
};
