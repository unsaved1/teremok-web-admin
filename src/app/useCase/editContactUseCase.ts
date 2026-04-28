import type {ContentRepository} from '@/domain/entity/content';
import type {IContact, IEditContactInput} from '@/domain/entity/content/interfaces';

export class EditContactUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(data: IEditContactInput): Promise<IContact> {
        return await this.contentRepo.editContact(data);
    }
}
