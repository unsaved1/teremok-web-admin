import type {IPagination} from './interfaces/base';

export abstract class BaseRepository<T, Id = string> {
    abstract getList(offset: number, limit: number): Promise<IPagination<T>>;
    abstract getById(id: Id): Promise<T>;
    abstract create(data: unknown): Promise<T>;
    abstract edit(id: Id, data: unknown): Promise<T>;
    abstract delete(id: Id): Promise<void>;
}
