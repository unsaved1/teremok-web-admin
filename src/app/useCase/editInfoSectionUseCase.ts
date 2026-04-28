import type {ContentRepository} from '@/domain/entity/content';
import type {IEditInfoSectionInput, IInfoSection} from '@/domain/entity/content/interfaces';

export class EditInfoSectionUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(id: IInfoSection['id'], data: IEditInfoSectionInput): Promise<IInfoSection> {
        return await this.contentRepo.editInfoSection(id, data);
    }
}
