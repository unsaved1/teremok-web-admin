export interface IPagination<T> {
    items: Array<T>;
    info: {
        offset: number;
        limit: number;
        total: number;
    };
}
