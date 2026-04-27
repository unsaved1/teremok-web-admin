import type {IImage} from '@/domain/shared/entity/image';
import type {Nullable} from '@/shared/types';

export interface IHouseParam {
    id: string;
    key: string;
    value: string;
}

export interface IHouse {
    id: string;
    name: string;
    description: Nullable<string>;
    beds: number;
    price: number;
    created_at: Nullable<Date>;
    updated_at: Nullable<Date>;
    house_params: Array<IHouseParam>;
    house_images: Array<IImage>;
}
