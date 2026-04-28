import type {ContentRepository} from '@/domain/entity/content';
import type {
    ICreateServiceInput,
    ICreateInfoSectionInput,
    IEditServiceInput,
    IEditInfoSectionInput,
    IService,
    IInfoSection,
    IContact,
    IEditContactInput,
} from '@/domain/entity/content/interfaces';
import type {ContentRemoteDataSource} from './remote';
import {contactDtoToDomain, editContactInputToDto, getServiceInputDto} from './dto';
import {
    createInfoSectionInputToDto,
    createServiceInputToDto,
    deleteInfoSectionInputToDto,
    deleteServiceInputToDto,
    editInfoSectionInputToDto,
    editServiceInputToDto,
    infoSectionDtoToDomain,
    serviceDtoToDomain,
} from './dto';
import type {Nullable} from '@/shared/types';

export class ContentRepositoryImpl implements ContentRepository {
    constructor(private remoteDS: ContentRemoteDataSource) {}

    async getById(id: string): Promise<IService> {
        const res = await this.remoteDS.getService(getServiceInputDto.parse({service_id: id}));
        return serviceDtoToDomain(res);
    }

    async getList(): Promise<never> {
        throw new Error('Not implemented for content repository. Use getServiceList instead.');
    }

    async getServiceList(): Promise<Array<IService>> {
        const res = await this.remoteDS.getServiceList();
        return res.map(serviceDtoToDomain);
    }

    async createService(data: ICreateServiceInput): Promise<IService> {
        const res = await this.remoteDS.createService(createServiceInputToDto([data]));
        return serviceDtoToDomain(res);
    }

    async editService(id: string, data: IEditServiceInput): Promise<IService> {
        const res = await this.remoteDS.editService(editServiceInputToDto([id, data]));
        return serviceDtoToDomain(res);
    }

    async getContact(): Promise<Nullable<IContact>> {
        const res = await this.remoteDS.getContact();
        if (!res) {
            return null;
        }
        return contactDtoToDomain(res);
    }

    async editContact(data: IEditContactInput): Promise<IContact> {
        return contactDtoToDomain(await this.remoteDS.editContact(editContactInputToDto([data])));
    }

    async getInfoSectionById(id: string): Promise<IInfoSection> {
        const res = await this.remoteDS.getInfoSection({info_section_id: id});
        return infoSectionDtoToDomain(res);
    }

    async getInfoSectionList(): Promise<Array<IInfoSection>> {
        const res = await this.remoteDS.getInfoSectionList();
        return res.map(infoSectionDtoToDomain);
    }

    async createInfoSection(data: ICreateInfoSectionInput): Promise<IInfoSection> {
        const res = await this.remoteDS.createInfoSection(createInfoSectionInputToDto([data]));
        return infoSectionDtoToDomain(res);
    }

    async editInfoSection(id: string, data: IEditInfoSectionInput): Promise<IInfoSection> {
        const res = await this.remoteDS.editInfoSection(editInfoSectionInputToDto([id, data]));
        return infoSectionDtoToDomain(res);
    }

    async deleteInfoSection(id: string): Promise<void> {
        await this.remoteDS.deleteInfoSection(deleteInfoSectionInputToDto([id]));
    }

    async create(data: ICreateServiceInput): Promise<IService> {
        return this.createService(data);
    }

    async edit(id: string, data: IEditServiceInput): Promise<IService> {
        return this.editService(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.remoteDS.deleteService(deleteServiceInputToDto([id]));
    }
}
