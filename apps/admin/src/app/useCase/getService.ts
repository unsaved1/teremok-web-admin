import type {ContentRepository} from '@/domain/entity/content';
import type {IService} from '@/domain/entity/content/interfaces';

export class GetServiceUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(id: IService['id']): Promise<IService> {
        return await this.contentRepo.getById(id);
    }
}
