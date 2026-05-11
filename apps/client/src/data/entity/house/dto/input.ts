import { houseDto } from "./output";
import * as z from "zod";

export const getHouseInputDto = z.object({
  house_id: houseDto.shape.id,
});

export const getHouseListInputDto = z.object({
  offset: z.number(),
  limit: z.number(),
});

export type TGetHouseInputDto = z.infer<typeof getHouseInputDto>;
export type TGetHouseListInputDto = z.infer<typeof getHouseListInputDto>;
