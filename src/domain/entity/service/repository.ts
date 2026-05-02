export abstract class HouseRepository {
    abstract create(): Promise<void>;
    abstract edit(): Promise<void>;
    abstract getList(): {};
}
