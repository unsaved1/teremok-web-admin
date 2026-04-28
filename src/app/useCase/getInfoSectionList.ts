import type {ContentRepository} from '@/domain/entity/content';
import type {IInfoSection} from '@/domain/entity/content/interfaces';

export class GetInfoSectionListUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(): Promise<Array<IInfoSection>> {
        return await this.contentRepo.getInfoSectionList();
    }
}
