import type {IImage} from '@/domain/shared/entity/image';
import type {Nullable} from '@repo/shared/types';

export interface ICreateHouseInput {
    name: string;
    description: Nullable<string>;
    beds: number;
    price: number;
    imageIds: Array<IImage['id']>;
}

export interface IEditHouseInput extends ICreateHouseInput {}
