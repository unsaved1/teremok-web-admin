import type { Nullable } from "@repo/shared/types";
import type { ContentRepository } from "@/domain/entity/content";
import type {
  IService,
  IInfoSection,
  IContact,
} from "@/domain/entity/content/interfaces";
import type { ContentRemoteDataSource } from "./remote";
import { contactDtoToDomain, getServiceInputDto } from "./dto";
import { infoSectionDtoToDomain, serviceDtoToDomain } from "./dto";

export class ContentRepositoryImpl implements ContentRepository {
  constructor(private remoteDS: ContentRemoteDataSource) {}

  async getById(id: string): Promise<IService> {
    const res = await this.remoteDS.getService(
      getServiceInputDto.parse({ service_id: id }),
    );
    return serviceDtoToDomain(res);
  }

  async getList(): Promise<never> {
    throw new Error(
      "Not implemented for content repository. Use getServiceList instead.",
    );
  }

  async getServiceList(): Promise<Array<IService>> {
    const res = await this.remoteDS.getServiceList();
    return res.map(serviceDtoToDomain);
  }

  async getContact(): Promise<Nullable<IContact>> {
    const res = await this.remoteDS.getContact();
    if (!res) {
      return null;
    }
    return contactDtoToDomain(res);
  }

  async getInfoSectionById(id: string): Promise<IInfoSection> {
    const res = await this.remoteDS.getInfoSection({ info_section_id: id });
    return infoSectionDtoToDomain(res);
  }

  async getInfoSectionList(): Promise<Array<IInfoSection>> {
    const res = await this.remoteDS.getInfoSectionList();
    return res.map(infoSectionDtoToDomain);
  }
}
