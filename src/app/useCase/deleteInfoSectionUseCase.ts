import type {ContentRepository} from '@/domain/entity/content';
import type {IInfoSection} from '@/domain/entity/content/interfaces';

export class DeleteInfoSectionUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(id: IInfoSection['id']): Promise<void> {
        await this.contentRepo.deleteInfoSection(id);
    }
}
