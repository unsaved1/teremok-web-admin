import type {ContentRepository} from '@/domain/entity/content';
import type {ICreateInfoSectionInput, IInfoSection} from '@/domain/entity/content/interfaces';

export class CreateInfoSectionUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(data: ICreateInfoSectionInput): Promise<IInfoSection> {
        return await this.contentRepo.createInfoSection(data);
    }
}
