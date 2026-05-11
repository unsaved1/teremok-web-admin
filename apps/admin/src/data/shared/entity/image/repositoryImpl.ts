import type {ImageRepository} from '@/domain/shared/entity/image';
import type {IImage} from '@/domain/shared/entity/image/interfaces';
import type {ImageRemoteDataSource} from './remote';
import {imageDtoToDomain} from './remote/mapping';

export class ImageRepositoryImpl implements ImageRepository {
    constructor(private readonly remoteDS: ImageRemoteDataSource) {}

    async upload(file: File): Promise<IImage> {
        const res = await this.remoteDS.upload(file);
        return imageDtoToDomain(res);
    }
}
