import type {IImage} from '@/domain/shared/entity/image';
import type {TImageDto} from './dto';

export function imageDtoToDomain(data: TImageDto): IImage {
    return {
        id: data.id,
        originalPath: data.original_path,
        sizeBytes: data.size_bytes,
        thumbnailPath: data.thumbnail_path,
        mimeType: data.mime_type,
        createdAt: data.created_at,
    };
}
