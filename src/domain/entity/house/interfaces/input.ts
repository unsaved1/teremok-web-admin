import type {IImage} from '@/domain/shared/entity/image';
import type {Nullable} from '@/shared/types';

export interface ICreateHouseInput {
    name: string;
    description: Nullable<string>;
    beds: number;
    price: number;
    image_ids: Array<IImage['id']>;
}

export interface IEditHouseInput extends ICreateHouseInput {}
