import type {
  IHouse,
  IHouseImage,
  IHouseParam,
} from "@/domain/entity/house/interfaces";
import { type THouseDto, type THouseImageDto, type THouseParamDto } from ".";
import { imageDtoToDomain } from "@/data/shared/entity/image/remote/mapping";

export function houseParamDtoToDomain(data: THouseParamDto): IHouseParam {
  return {
    id: data.id,
    key: data.key,
    value: data.value,
  };
}

function houseImageDtoToDomain(data: THouseImageDto): IHouseImage {
  return {
    id: data.id,
    sortOrder: data.sort_order,
    image: imageDtoToDomain(data.image),
  };
}

export function houseDtoToDomain(data: THouseDto): IHouse {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    beds: data.beds,
    images: data.house_images.map(houseImageDtoToDomain),
    params: data.house_params.map(houseParamDtoToDomain),
    createdAt: data.created_at ? new Date(data.created_at) : null,
    updatedAt: data.updated_at ? new Date(data.updated_at) : null,
  };
}
