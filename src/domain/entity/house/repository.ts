import {BaseRepository} from '@/domain/shared/repository';
import type {ICreateHouseInput, IEditHouseInput, IHouse, IHouseParam} from './interfaces';

export abstract class HouseRepository extends BaseRepository<IHouse> {
    abstract create(data: ICreateHouseInput): Promise<IHouse>;
    abstract edit(id: IHouse['id'], data: IEditHouseInput): Promise<IHouse>;
    abstract addParam(
        id: IHouse['id'],
        key: IHouseParam['key'],
        value: IHouseParam['value'],
    ): Promise<IHouse>;
    abstract removeParam(id: IHouse['id'], key: IHouseParam['key']): Promise<IHouse>;
}
