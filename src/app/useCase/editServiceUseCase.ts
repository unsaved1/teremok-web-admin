import type {ContentRepository} from '@/domain/entity/content';
import type {IEditServiceInput, IService} from '@/domain/entity/content/interfaces';

export class EditServiceUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(id: IService['id'], data: IEditServiceInput): Promise<IService> {
        return await this.contentRepo.editService(id, data);
    }
}
