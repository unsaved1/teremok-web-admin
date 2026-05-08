import type {ContentRepository} from '@/domain/entity/content';
import type {IInfoSection} from '@/domain/entity/content/interfaces';

export class GetInfoSectionUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(id: IInfoSection['id']): Promise<IInfoSection> {
        return await this.contentRepo.getInfoSectionById(id);
    }
}
