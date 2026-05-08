import type {IImage} from '@/domain/shared/entity/image';
import type {TImageDto} from './dto';

export function imageDtoToDomain(data: TImageDto): IImage {
    return {
        id: data.id,
        original_path: data.original_path,
        size_bytes: data.size_bytes,
        thumbnail_path: data.thumbnail_path,
        mime_type: data.mime_type,
        created_at: data.created_at,
    };
}
