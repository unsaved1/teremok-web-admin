import type {IImage} from '@/domain/shared/entity/image';
import type {IService} from './base';
import type {Nullable} from '@/shared/types';

export interface ICreateServiceInput {
    name: string;
    description: Nullable<string>;
    imageIds: Array<IImage['id']>;
}

export interface IEditServiceInput extends ICreateServiceInput {}

export interface ICreateInfoSectionInput {
    name: string;
    title: string;
    description: Nullable<string>;
    serviceIds: Array<IService['id']>;
    imageIds: Array<IImage['id']>;
}

export interface IEditInfoSectionInput extends ICreateInfoSectionInput {}
