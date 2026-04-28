import type {IImage} from '@/domain/shared/entity/image';
import type {Nullable} from '@/shared/types';

export interface IHouseParam {
    id: string;
    key: string;
    value: string;
}

export interface IHouseImage {
    id: string;
    sortOrder: number;
    image: IImage;
}

export interface IHouse {
    id: string;
    name: string;
    description: Nullable<string>;
    beds: number;
    price: number;
    createdAt: Nullable<Date>;
    updatedAt: Nullable<Date>;
    params: Array<IHouseParam>;
    images: Array<IHouseImage>;
}
