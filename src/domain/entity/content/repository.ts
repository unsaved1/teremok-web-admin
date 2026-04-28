import {BaseRepository} from '@/domain/shared/repository';
import type {
    IContact,
    ICreateInfoSectionInput,
    ICreateServiceInput,
    IEditInfoSectionInput,
    IEditContactInput,
    IEditServiceInput,
    IInfoSection,
    IService,
} from './interfaces';
import type {Nullable} from '@/shared/types';

export abstract class ContentRepository extends BaseRepository<IService> {
    abstract createService(data: ICreateServiceInput): Promise<IService>;
    abstract editService(id: IService['id'], data: IEditServiceInput): Promise<IService>;
    abstract getServiceList(): Promise<Array<IService>>;
    abstract getInfoSectionById(id: IInfoSection['id']): Promise<IInfoSection>;
    abstract getInfoSectionList(): Promise<Array<IInfoSection>>;
    abstract createInfoSection(data: ICreateInfoSectionInput): Promise<IInfoSection>;
    abstract editInfoSection(id: IInfoSection['id'], data: IEditInfoSectionInput): Promise<IInfoSection>;
    abstract deleteInfoSection(id: IInfoSection['id']): Promise<void>;
    abstract getContact(): Promise<Nullable<IContact>>;
    abstract editContact(data: IEditContactInput): Promise<IContact>;
}
