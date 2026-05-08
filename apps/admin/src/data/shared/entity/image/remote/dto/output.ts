import * as z from 'zod';

export const imageDto = z.looseObject({
    id: z.string(),
    original_path: z.string(),
    thumbnail_path: z.string().nullable(),
    mime_type: z.string(),
    size_bytes: z.number(),
    created_at: z.coerce.date().nullable(),
});

export type TImageDto = z.infer<typeof imageDto>;
