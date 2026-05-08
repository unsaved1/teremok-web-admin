import type { IPagination } from "./interfaces/base";

export abstract class BaseRepository<T, Id = string> {
  abstract getList(offset: number, limit: number): Promise<IPagination<T>>;
  abstract getById(id: Id): Promise<T>;
}
