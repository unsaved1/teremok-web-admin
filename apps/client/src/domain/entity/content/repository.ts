import { BaseRepository } from "@/domain/shared/repository";
import type { IContact, IInfoSection, IService } from "./interfaces";
import type { Nullable } from "@repo/shared/types";

export abstract class ContentRepository extends BaseRepository<IService> {
  abstract getServiceList(): Promise<Array<IService>>;
  abstract getInfoSectionById(id: IInfoSection["id"]): Promise<IInfoSection>;
  abstract getInfoSectionList(): Promise<Array<IInfoSection>>;
  abstract getContact(): Promise<Nullable<IContact>>;
}
