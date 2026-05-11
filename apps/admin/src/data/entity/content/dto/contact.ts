import * as z from 'zod';

export const contactDto = z.object({
    phone: z.string(),
    address: z.string(),
    messenger: z.string(),
});

export const editContactInputDto = contactDto;

export type TContactDto = z.infer<typeof contactDto>;
export type TEditContactInputDto = z.infer<typeof editContactInputDto>;
