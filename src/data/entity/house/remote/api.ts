import {BaseRemoteDataSource} from '@/data/shared/remote';
import {
    houseDto,
    housePaginationDto,
    type TAddHouseParamInputDto,
    type TCreateHouseInputDto,
    type TDeleteHouseInputDto,
    type TEditHouseInputDto,
    type TGetHouseInputDto,
    type TGetHouseListInputDto,
    type THouseDto,
    type THousePaginationDto,
    type TRemoveHouseParamInputDto,
} from '../dto';

export class HouseRemoteDataSource extends BaseRemoteDataSource {
    public prefix = '/house';

    async getList(data: TGetHouseListInputDto): Promise<THousePaginationDto> {
        const res = await this.rpcCall('house.getList', data);
        return housePaginationDto.parse(res);
    }

    async get(data: TGetHouseInputDto): Promise<THouseDto> {
        const res = await this.rpcCall('house.get', data);
        return houseDto.parse(res);
    }

    async create(data: TCreateHouseInputDto): Promise<THouseDto> {
        const res = await this.rpcCall('house.create', data);
        return houseDto.parse(res);
    }

    async edit(data: TEditHouseInputDto) {
        const res = await this.rpcCall('house.update', data);
        return houseDto.parse(res);
    }

    async delete(data: TDeleteHouseInputDto): Promise<void> {
        await this.rpcCall('house.delete', data);
    }

    async addParam(data: TAddHouseParamInputDto): Promise<THouseDto> {
        const res = await this.rpcCall('house.addParam', data);
        return houseDto.parse(res);
    }

    async removeParam(data: TRemoveHouseParamInputDto): Promise<THouseDto> {
        const res = await this.rpcCall('house.removeParam', data);
        return houseDto.parse(res);
    }
}
