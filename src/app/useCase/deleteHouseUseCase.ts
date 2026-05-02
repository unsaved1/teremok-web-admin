import type {HouseRepository} from '@/domain/entity/house';
import type {IHouse} from '@/domain/entity/house/interfaces';

export class DeleteHouseUseCase {
    constructor(private houseRepo: HouseRepository) {}

    async execute(id: IHouse['id']): Promise<void> {
        await this.houseRepo.delete(id);
    }
}
