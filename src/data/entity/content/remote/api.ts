import {BaseRemoteDataSource} from '@/data/shared/remote';
import {
    contactDto,
    infoSectionDto,
    serviceDto,
    type TContactDto,
    type TCreateServiceInputDto,
    type TDeleteServiceInputDto,
    type TDeleteInfoSectionInputDto,
    type TCreateInfoSectionInputDto,
    type TEditInfoSectionInputDto,
    type TEditContactInputDto,
    type TEditServiceInputDto,
    type TGetInfoSectionInputDto,
    type TGetServiceInputDto,
    type TServiceDto,
    type TInfoSectionDto,
} from '../dto';
import type {Nullable} from '@/shared/types';

export class ContentRemoteDataSource extends BaseRemoteDataSource {
    public prefix = '/content';

    async getServiceList(): Promise<Array<TServiceDto>> {
        const res = await this.rpcCall('service.list', {});
        return serviceDto.array().parse(res);
    }

    async getService(data: TGetServiceInputDto): Promise<TServiceDto> {
        const res = await this.rpcCall('service.get', data);
        return serviceDto.parse(res);
    }

    async createService(data: TCreateServiceInputDto): Promise<TServiceDto> {
        const res = await this.rpcCall('service.create', data);
        return serviceDto.parse(res);
    }

    async editService(data: TEditServiceInputDto): Promise<TServiceDto> {
        const res = await this.rpcCall('service.update', data);
        return serviceDto.parse(res);
    }

    async deleteService(data: TDeleteServiceInputDto): Promise<void> {
        await this.rpcCall('service.delete', data);
    }

    async getContact(): Promise<Nullable<TContactDto>> {
        const res = await this.rpcCall('contact.get', {});
        if (!res) {
            return null;
        }
        return contactDto.parse(res);
    }

    async editContact(data: TEditContactInputDto): Promise<TContactDto> {
        const res = await this.rpcCall('contact.update', data);
        return contactDto.parse(res);
    }

    async getInfoSectionList(): Promise<Array<TInfoSectionDto>> {
        const res = await this.rpcCall('infoSection.list', {});
        return infoSectionDto.array().parse(res);
    }

    async getInfoSection(data: TGetInfoSectionInputDto): Promise<TInfoSectionDto> {
        const res = await this.rpcCall('infoSection.get', data);
        return infoSectionDto.parse(res);
    }

    async createInfoSection(data: TCreateInfoSectionInputDto): Promise<TInfoSectionDto> {
        const res = await this.rpcCall('infoSection.create', data);
        return infoSectionDto.parse(res);
    }

    async editInfoSection(data: TEditInfoSectionInputDto): Promise<TInfoSectionDto> {
        const res = await this.rpcCall('infoSection.update', data);
        return infoSectionDto.parse(res);
    }

    async deleteInfoSection(data: TDeleteInfoSectionInputDto): Promise<void> {
        await this.rpcCall('infoSection.delete', data);
    }
}
