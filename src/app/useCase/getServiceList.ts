import type {ContentRepository} from '@/domain/entity/content';
import type {IService} from '@/domain/entity/content/interfaces';

export class GetServiceListUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(): Promise<Array<IService>> {
        return await this.contentRepo.getServiceList();
    }
}
