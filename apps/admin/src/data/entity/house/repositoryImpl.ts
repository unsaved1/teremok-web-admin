import type {HouseRepository} from '@/domain/entity/house';
import type {ICreateHouseInput, IHouse, IEditHouseInput} from '@/domain/entity/house/interfaces';
import type {IPagination} from '@/domain/shared/interfaces/base';
import type {HouseRemoteDataSource} from './remote';
import {getHouseInputDto, getHouseListInputDto} from './dto';
import {paginationDtoToDomain} from '@/data/shared/remote';
import {
    addHouseParamInputToDto,
    createHouseInputToDto,
    deleteHouseInputToDto,
    editHouseInputToDto,
    houseDtoToDomain,
    removeHouseParamInputToDto,
} from './dto/mapping';

export class HouseRepositoryImpl implements HouseRepository {
    constructor(private remoteDS: HouseRemoteDataSource) {}

    async getById(id: string): Promise<IHouse> {
        const res = await this.remoteDS.get(getHouseInputDto.parse({house_id: id}));
        return houseDtoToDomain(res);
    }

    async getList(offset: number, limit: number): Promise<IPagination<IHouse>> {
        const res = await this.remoteDS.getList(
            getHouseListInputDto.parse({limit: limit, offset: offset}),
        );
        return paginationDtoToDomain(res, houseDtoToDomain);
    }

    async create(data: ICreateHouseInput): Promise<IHouse> {
        const res = await this.remoteDS.create(createHouseInputToDto([data]));
        return houseDtoToDomain(res);
    }
    async edit(id: string, data: IEditHouseInput): Promise<IHouse> {
        const res = await this.remoteDS.edit(editHouseInputToDto([id, data]));
        return houseDtoToDomain(res);
    }
    async delete(id: string): Promise<void> {
        await this.remoteDS.delete(deleteHouseInputToDto([id]));
    }

    async addParam(id: string, key: string, value: string): Promise<IHouse> {
        const res = await this.remoteDS.addParam(addHouseParamInputToDto([id, key, value]));
        return houseDtoToDomain(res);
    }

    async removeParam(id: string, key: string): Promise<IHouse> {
        const res = await this.remoteDS.removeParam(removeHouseParamInputToDto([id, key]));
        return houseDtoToDomain(res);
    }
}
