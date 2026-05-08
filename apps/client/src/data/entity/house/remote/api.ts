import { BaseRemoteDataSource } from "@/data/shared/remote";
import {
  houseDto,
  housePaginationDto,
  type TGetHouseInputDto,
  type TGetHouseListInputDto,
  type THouseDto,
  type THousePaginationDto,
} from "../dto";

export class HouseRemoteDataSource extends BaseRemoteDataSource {
  public prefix = "/house";

  async getList(data: TGetHouseListInputDto): Promise<THousePaginationDto> {
    const res = await this.rpcCall("house.list", data);
    return housePaginationDto.parse(res);
  }

  async get(data: TGetHouseInputDto): Promise<THouseDto> {
    const res = await this.rpcCall("house.get", data);
    return houseDto.parse(res);
  }
}
