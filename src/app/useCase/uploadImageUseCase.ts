import type {ImageRepository} from '@/domain/shared/entity/image';
import type {IImage} from '@/domain/shared/entity/image/interfaces';

export class UploadImageUseCase {
    constructor(private readonly imageRepo: ImageRepository) {}

    async execute(file: File): Promise<IImage> {
        return this.imageRepo.upload(file);
    }
}
