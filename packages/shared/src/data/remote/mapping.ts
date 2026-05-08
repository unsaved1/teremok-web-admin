import type { IPagination } from "../../domain";
import type { TPaginationDto } from "./dto";

import * as z from "zod";

export function paginationDtoToDomain<T extends z.infer<z.ZodAny>, R>(
  data: TPaginationDto<T>,
  itemMappingFn: (data: T) => R,
): IPagination<R> {
  return {
    items: data.items.map(itemMappingFn),
    info: {
      offset: data.info.offset,
      limit: data.info.limit,
      total: data.info.total,
    },
  };
}
