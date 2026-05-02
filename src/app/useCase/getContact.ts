import type {ContentRepository} from '@/domain/entity/content';
import type {IContact} from '@/domain/entity/content/interfaces';
import type {Nullable} from '@/shared/types';

export class GetContactUseCase {
    constructor(private contentRepo: ContentRepository) {}

    async execute(): Promise<Nullable<IContact>> {
        return await this.contentRepo.getContact();
    }
}
