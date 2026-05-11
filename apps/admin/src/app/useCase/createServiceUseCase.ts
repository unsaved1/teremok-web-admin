import type {ContentRepository} from '@/domain/entity/content';
import type {ICreateServiceInput, IService} from '@/domain/entity/content/interfaces';

export class CreateServiceUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(data: ICreateServiceInput): Promise<IService> {
        return await this.contentRepo.createService(data);
    }
}
