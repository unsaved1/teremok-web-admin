import type {
  IContact,
  IInfoSection,
  IService,
} from "@/domain/entity/content/interfaces";
import {
  contactDto,
  type TContactDto,
  type TInfoSectionDto,
  type TServiceDto,
} from "./output";
import { imageDtoToDomain } from "@/data/shared/entity/image/remote/mapping";

export function serviceDtoToDomain(data: TServiceDto): IService {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    images: data.service_images.map((item) => ({
      id: item.id,
      sortOrder: item.sort_order,
      image: imageDtoToDomain(item.image),
    })),
  };
}

export function contactDtoToDomain(data: TContactDto): IContact {
  return contactDto.parse(data);
}

export function infoSectionDtoToDomain(data: TInfoSectionDto): IInfoSection {
  return {
    id: data.id,
    name: data.name,
    title: data.title,
    description: data.description,
    serviceIds: data.service_ids,
    services: data.services.map(serviceDtoToDomain),
    images: data.info_section_images.map(({ id, sort_order, image }) => ({
      id: id,
      sortOrder: sort_order,
      image: {
        id: image.id,
        createdAt: image.created_at,
        mimeType: image.mime_type,
        originalPath: image.original_path,
        thumbnailPath: image.thumbnail_path,
        sizeBytes: image.size_bytes,
      },
    })),
  };
}
