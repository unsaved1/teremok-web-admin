import type { HouseRepository } from "@/domain/entity/house";
import type { IHouse } from "@/domain/entity/house/interfaces";
import type { IPagination } from "@/domain/shared/interfaces/base";
import type { HouseRemoteDataSource } from "./remote";
import { getHouseInputDto, getHouseListInputDto } from "./dto";
import { paginationDtoToDomain } from "@/data/shared/remote";
import { houseDtoToDomain } from "./dto/mapping";

export class HouseRepositoryImpl implements HouseRepository {
  constructor(private remoteDS: HouseRemoteDataSource) {}

  async getById(id: string): Promise<IHouse> {
    const res = await this.remoteDS.get(
      getHouseInputDto.parse({ house_id: id }),
    );
    return houseDtoToDomain(res);
  }

  async getList(offset: number, limit: number): Promise<IPagination<IHouse>> {
    const res = await this.remoteDS.getList(
      getHouseListInputDto.parse({ limit: limit, offset: offset }),
    );
    return paginationDtoToDomain(res, houseDtoToDomain);
  }
}
