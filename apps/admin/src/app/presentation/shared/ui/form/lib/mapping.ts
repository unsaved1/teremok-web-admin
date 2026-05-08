import type {IImage} from '@/domain/shared/entity/image';
import type {IFileData} from '../FileUploader';

export function imageToFileData(data: IImage): IFileData {
    return {
        id: data.id,
        path: data.original_path,
        thumbPath: data.thumbnail_path,
        mimeType: data.mime_type,
    };
}
