import { BaseRemoteDataSource } from "@/data/shared/remote";
import {
  contactDto,
  infoSectionDto,
  serviceDto,
  type TContactDto,
  type TGetInfoSectionInputDto,
  type TGetServiceInputDto,
  type TServiceDto,
  type TInfoSectionDto,
} from "../dto";
import type { Nullable } from "@repo/shared/types";

export class ContentRemoteDataSource extends BaseRemoteDataSource {
  public prefix = "/content";

  async getServiceList(): Promise<Array<TServiceDto>> {
    const res = await this.rpcCall("service.list", {});
    return serviceDto.array().parse(res);
  }

  async getService(data: TGetServiceInputDto): Promise<TServiceDto> {
    const res = await this.rpcCall("service.get", data);
    return serviceDto.parse(res);
  }

  async getContact(): Promise<Nullable<TContactDto>> {
    const res = await this.rpcCall("contact.get", {});
    if (!res) {
      return null;
    }
    return contactDto.parse(res);
  }

  async getInfoSectionList(): Promise<Array<TInfoSectionDto>> {
    const res = await this.rpcCall("infoSection.list", {});
    return infoSectionDto.array().parse(res);
  }

  async getInfoSection(
    data: TGetInfoSectionInputDto,
  ): Promise<TInfoSectionDto> {
    const res = await this.rpcCall("infoSection.get", data);
    return infoSectionDto.parse(res);
  }
}
