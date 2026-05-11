import type {ContentRepository} from '@/domain/entity/content';
import type {IService} from '@/domain/entity/content/interfaces';

export class DeleteServiceUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(id: IService['id']): Promise<void> {
        await this.contentRepo.delete(id);
    }
}
