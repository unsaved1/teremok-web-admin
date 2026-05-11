import { serviceDto } from "./output";
import * as z from "zod";

export const getServiceInputDto = z.object({
  service_id: serviceDto.shape.id,
});

export const getInfoSectionInputDto = z.object({
  info_section_id: z.string(),
});

export type TGetServiceInputDto = z.infer<typeof getServiceInputDto>;
export type TGetInfoSectionInputDto = z.infer<typeof getInfoSectionInputDto>;
