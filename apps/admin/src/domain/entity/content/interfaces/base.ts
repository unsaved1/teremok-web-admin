import type {IImage} from '@/domain/shared/entity/image';
import type {Nullable} from '@repo/shared/types';

export interface IServiceImage {
    id: string;
    sortOrder: number;
    image: IImage;
}

export interface IService {
    id: string;
    name: string;
    description: Nullable<string>;
    images: Array<IServiceImage>;
}

export interface IInfoSectionImage {
    id: string;
    sortOrder: number;
    image: IImage;
}

export interface IInfoSection {
    id: string;
    name: string;
    title: string;
    description: Nullable<string>;
    serviceIds: Array<IService['id']>;
    services: Array<IService>;
    images: Array<IInfoSectionImage>;
}
