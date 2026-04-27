import type {HouseRepository} from '@/domain/entity/house';
import type {IHouse} from '@/domain/entity/house/interfaces';

export class GetHouseUseCase {
    constructor(private houseRepo: HouseRepository) {}

    async execute(id: IHouse['id']): Promise<IHouse> {
        return this.houseRepo.getById(id);
    }
}
